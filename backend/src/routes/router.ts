import express, { Router, RequestHandler, Request, Response } from 'express'
import swaggerTool from 'swagger-ui-express'

import swaggerDocument from '../design/swagger.json'

import { Route, RouterPayload, Routes } from './types'
import { getEndpoints } from './endpoints'
import { logger, API_PREFIX } from '../tools'
import { Database } from '../database'

import { getUsers, parseUsers } from './users/users'
import { getStatus } from './status'

const setupRoute = <T>(router: Router, route: Route<T>, database: Database): void => {
  if (route.enabled) {
    logger(route.path)

    router[route.type](route.path, (request: Request, response: Response) => {
      logger(route)
      route.callback(request, response, database, route.option)
    })
  }

  logger({ path: route.path, status: route.enabled })
}

const initRoutes = (router: Router, routes: Route<unknown>[], database: Database): Router => {
  routes.forEach((route) => {
    setupRoute<unknown>(router, route, database)
  })

  return router
}

export const setupRoutes = (payload: RouterPayload): RequestHandler => {
  const { app, routes, swagger, view, database } = payload
  const router = express.Router()

  if (swagger.enabled) {
    app.use(API_PREFIX + Routes.swagger, swaggerTool.serve, swaggerTool.setup(swaggerDocument))
  }

  view.enabled && routes.push(getEndpoints(app))

  return initRoutes(router, routes, database)
}

export const routes = [getStatus(), parseUsers(), getUsers()]
