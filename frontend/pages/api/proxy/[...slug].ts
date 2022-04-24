import { Request, ParamsDictionary, Response } from "express-serve-static-core";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ParsedQs } from "qs";

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
  target: "https://backend.sef.today",
  changeOrigin: true,
  pathRewrite: { [`^/api/proxy`]: "" },
  secure: false,
});

export default function (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>
) {
  apiProxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }

    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    );
  });
}
