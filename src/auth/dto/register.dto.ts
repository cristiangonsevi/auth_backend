import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class RegisterUserDto extends PickType(UserDto, [
  'email',
  'password',
  'authMethod',
  'firstName',
] as const) {}
