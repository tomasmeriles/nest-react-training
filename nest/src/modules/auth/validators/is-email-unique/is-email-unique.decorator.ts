import { Validate } from 'class-validator';
import { IsEmailUniqueValidator } from './is-email-unique.validator.js';

export function IsEmailUnique() {
  return Validate(IsEmailUniqueValidator);
}
