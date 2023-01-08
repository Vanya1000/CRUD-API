import { MiddlewareType } from "../types.js";

const middlewareBodyParser: MiddlewareType = (req, res, next) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      if (body.length !== 0) req.body = JSON.parse(body);
      next();
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
}

export default middlewareBodyParser;