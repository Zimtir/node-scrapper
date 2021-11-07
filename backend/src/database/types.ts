import { UserRepository } from './repositories/user'

export interface Repository {
  user: UserRepository
  isMock?: boolean
}
