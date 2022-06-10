import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class LoginUserDto extends PickType(UserDto, [
  'email',
  'password',
  'authMethod',
] as const) {}
