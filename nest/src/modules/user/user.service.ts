import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input.js';
import { UserFindUniqueArgs } from '../../../prisma/generated/models.js';
import { UserRepository } from './user.repository.js';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUnique(data: UserFindUniqueArgs) {
    return this.userRepository.findUnique(data);
  }

  async create(data: CreateUserInput) {
    return this.userRepository.create(data);
  }
}
