import type { Express, Request, Response } from 'express'
import endpoints from 'express-list-endpoints'

import { Requests, Route, Routes } from './types'

export const getEndpoints = (app: Express): Route<unknown> => ({
  enabled: true,
  path: Routes.endpoints,
  callback: async (_request: Request, response: Response) => {
    response.send(endpoints(app))
  },
  type: Requests.get,
})
