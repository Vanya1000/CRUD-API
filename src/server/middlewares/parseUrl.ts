import { MiddlewareType } from "../types";

const middlwareParseUrl: MiddlewareType = (req, res, next) => {
  const parseUrl = new URL(req.url);
  //console.log(parseUrl);
  req.pathname =  parseUrl.pathname;
  const params = {};
  for (const [key, value] of parseUrl.searchParams) {
    params[key] = value;
  }
  req.params = params;
  //console.log(params);
  next();
}

export default middlwareParseUrl;