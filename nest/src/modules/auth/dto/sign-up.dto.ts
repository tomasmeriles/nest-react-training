import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsEmailUnique } from '../validators/is-email-unique/is-email-unique.decorator.js';

export class SignUpDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  @IsEmailUnique()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
