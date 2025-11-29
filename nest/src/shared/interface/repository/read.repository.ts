export interface ReadRepository {
  findAll(select: object, where: object, orderBy: object): Promise<object>;

  findFirst(select: object, where: object): Promise<object | null>;

  findUnique(select: object, where: object): Promise<object | null>;
}
