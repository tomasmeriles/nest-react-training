import { Injectable } from '@nestjs/common';
import {
  UserCreateInput,
  UserFindFirstArgs,
  UserFindManyArgs,
  UserFindUniqueArgs,
  UserUpdateInput,
} from '../../../prisma/generated/models.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CRUDRepository } from '../../shared/interface/repository/crud.repository.js';

@Injectable()
export class UserRepository implements CRUDRepository {
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
    return await this.prisma.user.create({ data });
  }

  async update(id: number, data: UserUpdateInput) {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }

  async reactivate(id: number) {
    return await this.prisma.user.update({
      where: { id },
      data: { active: true },
    });
  }
}
