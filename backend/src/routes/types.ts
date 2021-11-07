import { Express, Request, Response } from 'express'
import { Setting } from '../types'

export type RouterCallback = <T>(request: Request, response: Response, option?: T) => void

export const Responses = {
  OK: {
    status: 200,
    message: 'OK',
  },
  ERROR: {
    status: 500,
    message: 'Something went wrong',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
    name: 'Default',
  },
}

// eslint-disable-next-line no-shadow
export enum Requests {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

// eslint-disable-next-line no-shadow
export enum Routes {
  status = '/status',
  endpoints = '/endpoints',
  swagger = '/swagger',
  parseUsers = '/users/parse',
  parseExternalUsers = '/users/parseExternalUsers',
  getUsers = '/users/all',
}

export interface Route<T> {
  enabled: boolean
  path: Routes
  type: Requests
  option?: T
  callback?: RouterCallback
  middlewares?: RouterCallback[]
}

export interface RouterPayload {
  routes: Route<unknown>[]
  app: Express
  view: Setting
  swagger: Setting
}
