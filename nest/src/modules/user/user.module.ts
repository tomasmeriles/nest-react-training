import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
