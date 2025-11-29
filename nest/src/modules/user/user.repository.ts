import { Injectable } from '@nestjs/common';
import {
  UserCreateInput,
  UserFindFirstArgs,
  UserFindManyArgs,
  UserFindUniqueArgs,
  UserUpdateInput,
} from '../../../prisma/generated/models.js';
import { ReadRepository } from '../../shared/interface/repository/read.repository.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserRepository implements ReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(args?: UserFindManyArgs) {
    return await this.prisma.user.findMany(args);
  }

  async findFirst(args?: UserFindFirstArgs) {
    return await this.prisma.user.findFirst(args);
  }

  async findUnique(args: UserFindUniqueArgs) {
    return await this.prisma.user.findUnique(args);
  }

  async create(data: UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
