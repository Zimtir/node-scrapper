import type { Request, Response } from 'express'
import { browser } from '../../tools/browser'
import { database } from '../../tools/database'
import { Requests, Responses, Route, Routes } from '../types'
import { parseUsersWithPagination } from './utils'

export const parseUsers = (): Route<unknown> => ({
  enabled: true,
  path: Routes.parseUsers,
  callback: async (_request: Request, response: Response): Promise<void> => {
    try {
      const users = await parseUsersWithPagination()
      const databaseUsers = await database.repository.user.putMany(users)

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

export const parseExternalUsers = (): Route<unknown> => ({
  enabled: false,
  path: Routes.parseExternalUsers,
  callback: async (_request: Request, response: Response): Promise<void> => {
    if (browser.isBusy) {
      response.send({
        ...Responses.ERROR,
        message: 'Browser is busy',
      })

      return
    }

    await browser.openBrowser()

    const page = await browser.navigate('https://google')

    response.send({
      ...Responses.OK,
      title: await page.title(),
      url: page.url(),
    })
  },
  type: Requests.get,
})

export const getUsers = (): Route<unknown> => ({
  enabled: true,
  path: Routes.getUsers,
  callback: async (_request: Request, response: Response): Promise<void> => {
    try {
      const databaseUsers = await database.repository.user.getAll()

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
