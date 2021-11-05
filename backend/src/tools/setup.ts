import type { Server } from "http";
import express, {
  Router,
  RequestHandler,
  Request,
  Response,
  Express,
} from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import swaggerTool from "swagger-ui-express";

import swaggerDocument from "../design/swagger.json";
import {
  Responses,
  CompressionPayload,
  RouterPayload,
  Setting,
  Route,
  Routes,
  StaticPayload,
  ExpressConfiguration,
} from "../types";

import { getEndpoints } from "../routes/endpoints";
import { getError } from "../routes/error";
import { API_PREFIX } from "./environment";
import { logger } from "./logger";

const setupRoute = <T>(router: Router, route: Route<T>): void => {
  if (route.enabled) {
    logger(route.path);

    router[route.type](route.path, (request: Request, response: Response) => {
      logger(route);
      route.callback(request, response, route.option);
    });
  }

  logger({ path: route.path, status: route.enabled });
};

const initRoutes = (router: Router, routes: Route<unknown>[]): Router => {
  routes.forEach((route) => {
    setupRoute<unknown>(router, route);
  });

  return router;
};

export const setupRoutes = (payload: RouterPayload): RequestHandler => {
  const { app, routes, swagger, view } = payload;
  const router = express.Router();

  if (swagger.enabled) {
    app.use(
      API_PREFIX + Routes.swagger,
      swaggerTool.serve,
      swaggerTool.setup(swaggerDocument)
    );
  }

  view.enabled && routes.push(getEndpoints(app));

  return initRoutes(router, routes);
};

export const setupBodyParser = (): RequestHandler[] => [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
];

export const setupCompression = (payload: CompressionPayload): RequestHandler =>
  compression({ threshold: payload.threshold });

export const setupStatic = (payload: StaticPayload): RequestHandler =>
  express.static(payload.path);

export const setupExpress = (): Express => express();

export const setupRequestHandler = (
  setting: Setting,
  handler: (payload?: unknown) => RequestHandler | RequestHandler[]
): RequestHandler | RequestHandler[] => {
  const { enabled, payload } = setting;

  if (enabled) {
    return handler(payload);
  }

  return null;
};

export const setupCallback = (payload: Setting): (() => void) => {
  if (payload.enabled) {
    return payload.callback;
  }

  return null;
};

export const setupErrorHandler = (): RequestHandler => {
  const errorThrower = (request: Request, response: Response) => {
    getError(request, response, Responses.NOT_FOUND);
  };

  return errorThrower;
};

export const setupHelmet = (): RequestHandler =>
  helmet({
    contentSecurityPolicy: false,
  });

export const initExpress = (
  configuration: ExpressConfiguration,
  routes: Route<unknown>[]
): Server => {
  const app = setupExpress();

  return app
    .use(setupRequestHandler(configuration.static, setupStatic))
    .use(setupRequestHandler(configuration.compression, setupCompression))
    .use(setupRequestHandler(configuration.bodyParser, setupBodyParser))
    .use(setupRequestHandler(configuration.security, setupHelmet))
    .use(
      configuration.router.prefix,
      setupRequestHandler(
        {
          ...configuration.router,
          payload: {
            routes,
            app,
            view: configuration.router.view,
            swagger: configuration.swagger,
          },
        },
        setupRoutes
      )
    )
    .use(setupRequestHandler(configuration.errors, setupErrorHandler))
    .listen(configuration.port, setupCallback(configuration.listen));
};
