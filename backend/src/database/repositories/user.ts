import { Connection } from 'typeorm'
import { logger } from '../../tools'
import { User as UserModel } from '../../routes/users/types'
import { User as UserEntity } from '../entity/User'
import { Repository } from './types'
import { toEntity, toModel } from './fabric'

export class UserRepository implements Repository<UserModel, UserEntity> {
  toEntity: (user: UserModel) => UserEntity

  toModel: (user: UserEntity) => UserModel

  constructor(private readonly connection: Connection) {
    this.toModel = toModel
    this.toEntity = toEntity
  }

  getAll = async (): Promise<UserModel[]> => {
    logger('Loading users from the database...')

    const userEntities = await this.connection.manager.find(UserEntity)
    const userModels = userEntities.map(this.toModel)

    logger(`Loaded count of users: ${userEntities.length}`)

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
