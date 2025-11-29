import { Injectable, Logger } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto.js';
import { UserService } from '../user/user.service.js';
import { Builder } from 'builder-pattern';
import { CreateUserInput } from '../user/inputs/create-user.input.js';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private static SALT_ROUNDS = 10;

  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  async signUp(data: SignUpDto) {
    const hashedPassword = await bcrypt.hash(
      data.password,
      AuthService.SALT_ROUNDS,
    );

    const createUserDto = Builder<CreateUserInput>()
      .name(data.name)
      .email(data.email)
      .password(hashedPassword)
      .build();

    const createdUser = this.userService.create(createUserDto);
  }
}
