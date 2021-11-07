import { isDevelopment } from './environment'

const LOGGER_PREFIX = 'LOGGER:'

export const logger = (...args: unknown[]): void => {
  if (isDevelopment) {
    console.info(LOGGER_PREFIX, ...args)
  }
}

export const loggerWithDate = (...args: unknown[]): void => {
  logger(...args, new Date())
}
