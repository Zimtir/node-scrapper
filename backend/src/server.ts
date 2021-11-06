import { routes } from './routes'
import { API_PREFIX, PORT } from './tools/environment'
import { loggerWithDate } from './tools/logger'
import { initExpress } from './tools/setup'
import { initDatabaseConnection } from './database/setup'
import { Database } from './database/types'

const initServer = async (database: Database) => {
  initExpress(
    {
      bodyParser: {
        enabled: true,
      },
      router: {
        enabled: true,
        prefix: API_PREFIX,
        view: {
          enabled: true,
        },
      },
      errors: {
        enabled: true,
      },
      listen: {
        enabled: true,
        callback: () => {
          loggerWithDate(`Service started on port ${PORT}.`)
        },
      },
      security: {
        enabled: true,
      },
      static: {
        enabled: true,
        payload: {
          path: 'public',
        },
      },
      compression: {
        enabled: true,
        payload: {
          threshold: 0,
        },
      },
      swagger: {
        enabled: true,
      },
      port: parseInt(PORT, 10),
    },
    routes,
    database,
  )
}

initDatabaseConnection(initServer)
