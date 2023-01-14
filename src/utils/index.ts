import { NodeServerResType } from "../server/types.js";

export const sendJson = (
  res: NodeServerResType,
  data: object,
  status = 200
) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export const errorHandler = (error: unknown, res: NodeServerResType) => {
  if (error instanceof Error) {
    sendJson(res, { message: "Server error occur" }, 500);
  } else {
    sendJson(res, { message: "Unknown server error" }, 500);
  }
};
