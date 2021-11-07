import { createConnection } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { Repository, User } from '../database'
import { DATABASE_CREDENTIALS } from './environment'
import config from '../design/ormconfig.json'
import { UserRepository } from '../database/repositories/user'
import { loggerWithDate } from '.'
import { REPOSITORY_FIXTURE } from '../database/repositories/fixture'

export const DATABASE_INIT_DELAY = 100000

class Database {
  static instance: Database

  repository: Repository

  semaphore: NodeJS.Timer | null

  private constructor() {
    if (!this.repository) {
      this.semaphore = setInterval(() => {
        loggerWithDate('Database is missing... Trying to init...')
        this.init()
      }, DATABASE_INIT_DELAY)
    }
  }

  async init() {
    if (!this.repository || this.repository.isMock) {
      try {
        const connection = await createConnection({
          ...DATABASE_CREDENTIALS,
          ...config,
          entities: [User],
        } as MysqlConnectionOptions)
        const userRepository = new UserRepository(connection)

        this.repository = {
          user: userRepository,
          isMock: false,
        }

        this.semaphore = null

        loggerWithDate('Database has been initialized')
      } catch (error) {
        loggerWithDate(error)
        this.repository = REPOSITORY_FIXTURE
      }
    }
  }

  public static getInstance(): Database {
    if (!this.instance) {
      this.instance = new Database()
    }

    return this.instance
  }
}

export const database = Database.getInstance()
