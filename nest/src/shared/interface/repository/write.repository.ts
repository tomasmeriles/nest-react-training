export interface WriteRepository {
  create(data: object): Promise<object>;

  update(id: number, data: object): Promise<object>;

  delete(id: number): Promise<object>;
}
