import http from "http";
import { EventEmitter } from "events";
import {
  MiddlewareType,
  NodeServerReqType,
  NodeServerResType,
  NextFunctionType,
} from "./types.js";
import Router from "./Router.js";
import { sendJson } from "../utils/index.js";

class Application {
  private emitter: EventEmitter;
  public server: http.Server;
  private middlewares: MiddlewareType[];

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  public use(middleware: MiddlewareType) {
    // register middleware
    this.middlewares.push(middleware);
  }

  public listen(port: number | undefined, callback?: () => void) {
    this.server.listen(port, callback);
  }

  public close(callback?: () => void) {
    this.server.close(callback);
  }

  public addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res, id?) => {
          const handler = endpoint[method];
          handler(req, res, id);
        });
      });
    });
  }

  private _executeMiddlewares(
    middlewares: MiddlewareType[],
    req: NodeServerReqType,
    res: NodeServerResType,
    next: NextFunctionType
  ): void {
    if (middlewares.length === 0) {
      return next();
    }
    const currentMiddlware = middlewares[0];
    const nextMiddlewares = middlewares.slice(1);
    return currentMiddlware(req, res, () =>
      this._executeMiddlewares(nextMiddlewares, req, res, next)
    );
  }

  private _createServer() {
    return http.createServer((req, res) => {
      this._executeMiddlewares(this.middlewares, req, res, () => {
        const emmitted = this.emitter.emit(
          this._getRouteMask(req.url, req.method),
          req,
          res
        ); // return true or false
        if (!emmitted) {
          const pathWithId = req.url?.split("/");
          const id = pathWithId?.at(-1);
          const pathMask = pathWithId?.slice(0, -1).join("/") + "/:id";
          const emmittedWithId = this.emitter.emit(
            this._getRouteMask(pathMask, req.method),
            req,
            res,
            id
          );
          if (!emmittedWithId) {
            sendJson(res, { message: "There is no such Endpoint" }, 404)
          }
        }
      });
    });
  }

  private _getRouteMask(path: string | undefined, method: string | undefined) {
    return `[${path}]:[${method}]`;
  }
}

export default Application;
