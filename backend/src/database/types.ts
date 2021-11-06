import { UserRepository } from './repositories/user'

export interface Database {
  user: UserRepository
}
