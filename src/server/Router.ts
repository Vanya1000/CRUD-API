import { EndpointsType, HandlerType } from "./types.js";

class Router {
  public endpoints: EndpointsType;
  constructor() {
    this.endpoints = {};
  }

  request(method = "GET", path = "", handler: HandlerType) {
    if (path.includes(":")) {
      path = path.split(":")[0] + ":id";
    }
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`Endpoint ${method} ${path} already exists`);
    }
    endpoint[method] = handler;
  }

  get(path: string, handler: HandlerType) {
    this.request("GET", path, handler);
  }

  post(path: string, handler: HandlerType) {
    this.request("POST", path, handler);
  }

  put(path: string, handler: HandlerType) {
    this.request("PUT", path, handler);
  }

  delete(path: string, handler: HandlerType) {
    this.request("DELETE", path, handler);
  }

  getAllEndpoints() {
    return this.endpoints;
  }
}

export default Router;
