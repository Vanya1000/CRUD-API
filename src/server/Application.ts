import http from "http";
import { EventEmitter } from "events";
import {
  MiddlewareType,
  NodeServerReqType,
  NodeServerResType,
  NextFunctionType,
} from "./types.js";
import Router from "./Router.js";

class Application {
  private emitter: EventEmitter;
  private server: http.Server;
  private middlewares: MiddlewareType[];

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware: MiddlewareType) {
    // register middleware
    this.middlewares.push(middleware);
  }

  listen(port: string, callback?: () => void) {
    this.server.listen(port, callback);
  }

  addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];
          handler(req, res);
        });
      });
    });
  }

  _executeMiddlewares(
    middlewares: MiddlewareType[],
    req: NodeServerReqType,
    res: NodeServerResType,
    next: NextFunctionType
  ): void {
    // console.log(middlewares);
    if (middlewares.length === 0) {
      return next();
    }
    const currentMiddlware = middlewares[0];
    const nextMiddlewares = middlewares.slice(1);
    return currentMiddlware(req, res, () =>
      this._executeMiddlewares(nextMiddlewares, req, res, next)
    );
  }

  _createServer() {
    return http.createServer((req, res) => {
      this._executeMiddlewares(this.middlewares, req, res, () => {
        const emmitted = this.emitter.emit(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this._getRouteMask(req.pathname, req.method),
          req,
          res
        ); // return true or false
        if (!emmitted) {
          res.end("404 Not Found");
        }
      });
    });
  }

  _getRouteMask(path: string, method: string | undefined) {
    return `[${path}]:[${method}]`;
  }
}

export default Application;
