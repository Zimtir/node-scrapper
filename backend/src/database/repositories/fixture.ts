import { User as UserModel } from '../../routes/users/types'
import { Repository } from '../types'

import { loggerWithDate } from '../../tools'
import { UserRepository } from './user'

const REPOSITORY_FIXTURE_ERROR = new Error('Database not available')

export class UserRepositoryFixture extends UserRepository {
  getAll = async (): Promise<UserModel[]> => {
    throw REPOSITORY_FIXTURE_ERROR
  }

  putMany = async (_users: UserModel[]): Promise<UserModel[]> => {
    loggerWithDate(_users)
    throw REPOSITORY_FIXTURE_ERROR
  }

  put = async (user: UserModel): Promise<UserModel> => {
    loggerWithDate(user)
    throw REPOSITORY_FIXTURE_ERROR
  }
}

export const REPOSITORY_FIXTURE: Repository = { isMock: true, user: new UserRepositoryFixture(null) }
