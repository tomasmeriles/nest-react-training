import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { IsEmailUniqueValidator } from './validators/is-email-unique/is-email-unique.validator.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, IsEmailUniqueValidator],
  imports: [UserModule],
})
export class AuthModule {}
