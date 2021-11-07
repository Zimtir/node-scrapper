import { User as UserModel } from '../../routes/users/types'
import { User as UserEntity } from '../entity/User'

export const toModel = (user: UserEntity): UserModel => ({
  id: user.id,
  email: user.email,
  first_name: user.firstName,
  last_name: user.lastName,
  avatar: user.avatar,
})

export const toEntity = (user: UserModel): UserEntity => {
  const entity = new UserEntity()

  entity.id = user.id
  entity.email = user.email
  entity.firstName = user.first_name
  entity.lastName = user.last_name
  entity.avatar = user.avatar

  return entity
}
