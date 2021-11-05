import type { Express } from "express";
import type { Request, Response } from "express";

export const Responses = {
  OK: {
    status: 200,
    message: "OK",
  },
  ERROR: {
    status: 500,
    message: "Something went wrong",
  },
  NOT_FOUND: {
    status: 404,
    message: "Not Found",
    name: "Default",
  },
};

export enum Requests {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}

export enum Routes {
  status = "/status",
  endpoints = "/endpoints",
  swagger = "/swagger",
  parseUsers = '/users/parse'
}

export interface CompressionPayload {
  threshold: number;
}

export interface StaticPayload {
  path: string;
}

export interface Setting {
  enabled: boolean;
  callback?: () => void;
  payload?: unknown;
}

type RouterCallback = <T>(
  request: Request,
  response: Response,
  option?: T
) => void;

export interface Route<T> {
  enabled: boolean;
  path: Routes;
  type: Requests;
  option?: T;

  callback?: RouterCallback;
  middlewares?: RouterCallback[];
}

export interface RouterPayload {
  routes: Route<unknown>[];
  app: Express;
  view: Setting;
  swagger: Setting;
}

export interface ExpressConfiguration {
  bodyParser: Setting;
  router: Setting & {
    prefix: string;
    view: Setting;
  };
  errors: Setting;
  static: Setting & {
    payload: StaticPayload;
  };
  compression: Setting & {
    payload: CompressionPayload;
  };
  swagger: Setting;
  security: Setting;
  listen: Setting;
  port: number;
}

export interface ExpressInit {
  app: Express;
  onStart: (callback?: () => void) => void;
}

export interface HttpException extends Error {
  status: number;
  message: string;
}
