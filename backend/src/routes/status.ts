import type { Request, Response } from 'express'
import { Requests, Responses, Route, Routes } from './types'

export const getStatus = (): Route<unknown> => ({
  enabled: true,
  path: Routes.status,
  callback: async (_request: Request, response: Response) => {
    response.send(Responses.OK)
  },
  type: Requests.get,
})
