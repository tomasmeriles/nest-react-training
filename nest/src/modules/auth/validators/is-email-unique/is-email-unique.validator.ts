import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../../../user/user.service.js';

@ValidatorConstraint({ name: 'IsEmailUniqueValidator', async: true })
@Injectable()
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string): Promise<boolean> {
    const existing = await this.userService.findUnique({
      where: { email },
    });

    return !existing;
  }

  defaultMessage(): string {
    return 'Email already in use';
  }
}
