import { createConnection } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { ServerInitial } from '../types'
import { UserRepository } from './repositories/user'
import 'reflect-metadata'
import { DATABASE_CREDENTIALS } from '../tools/environment'
import { User } from './entity/User'
import config from '../design/ormconfig.json'

export const initDatabaseConnection = async (onInit: ServerInitial): Promise<void> => {
  const connection = await createConnection({
    ...DATABASE_CREDENTIALS,
    ...config,
    entities: [User],
  } as MysqlConnectionOptions)
  const userRepository = new UserRepository(connection)

  const database = {
    user: userRepository,
  }

  onInit(database)
}
