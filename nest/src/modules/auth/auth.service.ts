import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto.js';
import { UserService } from '../user/user.service.js';
import { Builder } from 'builder-pattern';
import { CreateUserInput } from '../user/inputs/create-user.input.js';
import bcrypt from 'bcrypt';
import { JwtPayload } from './interface/jwt-payload.interface.js';
import jwt from 'jsonwebtoken';
import { environment } from '../../config/environment/environment.js';
import { AuthenticatedUser } from './interface/authenticated-user.interface.js';
import ms from 'ms';
import { LoginDto } from './dto/login.dto.js';
import { DecodedRefreshToken } from './interface/decoded-refresh-token.interface.js';

@Injectable()
export class AuthService {
  private static SALT_ROUNDS = 10;

  private static ACCESS_TOKEN_EXPIRATION = ms('15d');

  private static REFRESH_TOKEN_EXPIRATION = ms('7d');

  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  private buildAndReturnAuthenticatedUser(user: {
    id: number;
    name: string;
    email: string;
  }): AuthenticatedUser {
    const jwtPayload = Builder<JwtPayload>()
      .sub(user.id)
      .email(user.email)
      .name(user.name)
      .build();

    const accessToken = this.getAccessToken(jwtPayload);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    };
  }

  async signUp(data: SignUpDto) {
    const hashedPassword = await bcrypt.hash(
      data.password,
      AuthService.SALT_ROUNDS,
    );

    const createUserInput = Builder<CreateUserInput>()
      .name(data.name)
      .email(data.email)
      .password(hashedPassword)
      .build();

    const createdUser = await this.userService.create(createUserInput);

    return this.buildAndReturnAuthenticatedUser(createdUser);
  }

  async login(data: LoginDto) {
    const user = await this.userService.findUnique({
      where: { email: data.email, active: true },
    });

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');

    return this.buildAndReturnAuthenticatedUser(user);
  }

  async refreshTokens(refreshToken: string | undefined) {
    if (!refreshToken) throw new UnauthorizedException('Empty token');

    let decoded: DecodedRefreshToken;

    try {
      decoded = jwt.verify(
        refreshToken,
        environment.JWT_REFRESH_SECRET,
      ) as DecodedRefreshToken;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError)
        throw new UnauthorizedException('Expired token');
      else if (error instanceof jwt.JsonWebTokenError)
        throw new UnauthorizedException('Invalid token');
      else throw error;
    }

    const user = await this.userService.findUnique({
      where: { id: decoded.sub, active: true },
    });

    if (!user)
      throw new UnauthorizedException(
        'User does not exists or it was eliminated',
      );

    return this.buildAndReturnAuthenticatedUser(user);
  }

  getAccessToken(payload: JwtPayload): string {
    const accessTokenPayload = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
    };

    const accessToken = jwt.sign(
      accessTokenPayload,
      environment.JWT_ACCESS_SECRET,
      {
        expiresIn: AuthService.ACCESS_TOKEN_EXPIRATION,
      },
    );

    return accessToken;
  }

  getRefreshToken(sub: number): string {
    const refreshToken = jwt.sign(
      {
        sub,
      },
      environment.JWT_REFRESH_SECRET,
      {
        expiresIn: AuthService.REFRESH_TOKEN_EXPIRATION,
      },
    );

    return refreshToken;
  }
}
