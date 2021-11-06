import { Connection } from 'typeorm'
import { logger } from '../../tools'
import { User as UserModel } from '../../routes/users/types'
import { User as UserEntity } from '../entity/User'
import { Repository } from './types'

export class UserRepository implements Repository<UserModel, UserEntity> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly connection: Connection) {}

  toModel = (user: UserEntity): UserModel => ({
    id: user.id,
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    avatar: user.avatar,
  })

  toEntity = (user: UserModel): UserEntity => {
    const entity = new UserEntity()

    entity.id = user.id
    entity.email = user.email
    entity.firstName = user.first_name
    entity.lastName = user.last_name
    entity.avatar = user.avatar

    return entity
  }

  getAll = async (): Promise<UserModel[]> => {
    logger('Loading users from the database...')

    const userEntities = await this.connection.manager.find(UserEntity)
    const userModels = userEntities.map(this.toModel)

    console.log('Loaded count of users: ', userEntities.length)

    return userModels
  }

  putMany = async (users: UserModel[]): Promise<UserModel[]> => {
    const userEntityPromises = users.map((user) => this.put(user))
    const userEntities = Promise.all(userEntityPromises)

    return userEntities
  }

  put = async (user: UserModel): Promise<UserModel> => {
    logger('Inserting a new user into the database...')

    const userEntity = this.toEntity(user)
    const userResponseEntity = await this.connection.manager.save(userEntity)

    logger(`Saved a new user with id: ${userResponseEntity.id}`)

    const userModel = this.toModel(userResponseEntity)

    return userModel
  }
}
