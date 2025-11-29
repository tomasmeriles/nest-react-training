export interface CRUDRepository {
  findAll(select: object, where: object, orderBy: object): Promise<object>;

  findFirst(select: object, where: object): Promise<object | null>;

  findUnique(select: object, where: object): Promise<object | null>;

  create(data: object): Promise<object>;

  update(id: number, data: object): Promise<object>;

  delete(id: number): Promise<object>;

  reactivate(id: number): Promise<object>;
}
