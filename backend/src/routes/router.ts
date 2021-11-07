import express, { Router, RequestHandler, Request, Response } from 'express'
import swaggerTool from 'swagger-ui-express'

import { logger, API_PREFIX } from '../tools'
import swaggerDocument from '../design/swagger.json'
import { Route, RouterPayload, Routes } from './types'
import { getEndpoints } from './endpoints'
import { getUsers, parseExternalUsers, parseUsers } from './users/users'
import { getStatus } from './status'

const setupRoute = <T>(router: Router, route: Route<T>): void => {
  if (route.enabled) {
    logger(route.path)

    router[route.type](route.path, (request: Request, response: Response) => {
      logger(route)
      route.callback(request, response, route.option)
    })
  }

  logger({ path: route.path, status: route.enabled })
}

const initRoutes = (router: Router, routes: Route<unknown>[]): Router => {
  routes.forEach((route) => {
    setupRoute<unknown>(router, route)
  })

  return router
}

export const setupRoutes = (payload: RouterPayload): RequestHandler => {
  const { app, routes, swagger, view } = payload
  const router = express.Router()

  if (swagger.enabled) {
    app.use(API_PREFIX + Routes.swagger, swaggerTool.serve, swaggerTool.setup(swaggerDocument))
  }

  if (view.enabled) {
    routes.push(getEndpoints(app))
  }

  return initRoutes(router, routes)
}

export const routes = [getStatus(), parseUsers(), getUsers(), parseExternalUsers()]
