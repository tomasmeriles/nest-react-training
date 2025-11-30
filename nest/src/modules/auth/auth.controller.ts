import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignUpDto } from './dto/sign-up.dto.js';
import { type Response } from 'express';
import { environment } from '../../config/environment/environment.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  private static REFRESH_COOKIE_NAME = 'refresh-token';

  private static REFRESH_COOKIE_EXPIRATION = 7 * 24 * 60 * 60 * 7000; // 7 days

  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto, @Res() res: Response) {
    const user = await this.authService.signUp(data);
    const refreshToken = this.authService.getRefreshToken(user.id);

    res
      .status(HttpStatus.CREATED)
      .cookie(AuthController.REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: environment.IS_PRODUCTION,
        sameSite: environment.IS_PRODUCTION ? 'strict' : 'lax',
        path: '/',
        maxAge: AuthController.REFRESH_COOKIE_EXPIRATION,
      })
      .json(user);
  }

  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const user = await this.authService.login(data);
    const refreshToken = this.authService.getRefreshToken(user.id);

    res
      .status(HttpStatus.OK)
      .cookie(AuthController.REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: environment.IS_PRODUCTION,
        sameSite: environment.IS_PRODUCTION ? 'strict' : 'lax',
        path: '/',
        maxAge: AuthController.REFRESH_COOKIE_EXPIRATION,
      })
      .json(user);
  }
}
