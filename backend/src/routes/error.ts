import type { Request, Response } from 'express'
import { loggerWithDate } from '../tools/logger'
import { Responses } from './types'

export const getError = async <HttpException>(
  _request: Request,
  response: Response,
  payload: HttpException,
): Promise<void> => {
  loggerWithDate(payload)

  response.send({
    ...Responses.ERROR,
    ...payload,
  })
}
