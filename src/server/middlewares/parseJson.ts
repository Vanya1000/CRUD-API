import { MiddlewareType } from "../types.js";

const middlewareJsonParser: MiddlewareType = (req, res, next) => {
  res.send = (data: object, status = 200) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  }

  next();
}

export default middlewareJsonParser; 