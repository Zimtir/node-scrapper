import type { Request, Response } from 'express'
import { Database } from '../../database'
import { Requests, Responses, Route, Routes } from '../types'
import { parseUsersWithPagination } from './utils'

export const parseUsers = (): Route<unknown> => ({
  enabled: true,
  path: Routes.parseUsers,
  callback: async (_request: Request, response: Response, database: Database): Promise<void> => {
    try {
      const users = await parseUsersWithPagination()
      const databaseUsers = await database.user.putMany(users)

      response.send({
        ...Responses.OK,
        data: databaseUsers,
      })
    } catch (error) {
      response.send({
        ...Responses.ERROR,
        ...error,
      })
    }
  },
  type: Requests.get,
})

export const getUsers = (): Route<unknown> => ({
  enabled: true,
  path: Routes.getUsers,
  callback: async (_request: Request, response: Response, database: Database): Promise<void> => {
    try {
      const databaseUsers = await database.user.getAll()

      response.send({
        ...Responses.OK,
        data: databaseUsers,
      })
    } catch (error) {
      response.send({
        ...Responses.ERROR,
        ...error,
      })
    }
  },
  type: Requests.get,
})
