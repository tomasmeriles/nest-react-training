import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignUpDto } from './dto/sign-up.dto.js';
import type { Request, Response } from 'express';
import { environment } from '../../config/environment/environment.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthenticatedUser } from './interface/authenticated-user.interface.js';

@Controller('auth')
export class AuthController {
  private static REFRESH_COOKIE_NAME = 'refresh-token';

  private static REFRESH_COOKIE_EXPIRATION = 7 * 24 * 60 * 60 * 7000; // 7 days

  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto, @Res() res: Response) {
    const user = await this.authService.signUp(data);
    const refreshToken = this.authService.getRefreshToken(user.id);

    this.sendAuthenticatedAndRefreshCookie(res, user, refreshToken);
  }

  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const user = await this.authService.login(data);
    const refreshToken = this.authService.getRefreshToken(user.id);

    this.sendAuthenticatedAndRefreshCookie(res, user, refreshToken);
  }

  @Post('refresh')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const refreshTokenCookie = req.cookies?.[
      AuthController.REFRESH_COOKIE_NAME
    ] as string | undefined;

    const user = await this.authService.refreshTokens(refreshTokenCookie);
    const refreshToken = this.authService.getRefreshToken(user.id);

    this.sendAuthenticatedAndRefreshCookie(res, user, refreshToken);
  }

  private sendAuthenticatedAndRefreshCookie(
    res: Response,
    user: AuthenticatedUser,
    refreshToken: string,
  ) {
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
