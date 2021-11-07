export interface Repository<Model, Entity> {
  getAll: () => Promise<Model[]>
  put: (data: Model) => Promise<Model>
  putMany: (data: Model[]) => Promise<Model[]>
  toEntity: (data: Model) => Entity
  toModel: (data: Entity) => Model
}
