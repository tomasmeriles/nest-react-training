import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto.js';

@Injectable()
export class AuthService {
  async login(credentials: LoginUserDto) {}
}
