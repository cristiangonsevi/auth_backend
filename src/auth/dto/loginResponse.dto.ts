import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class LoginResponseUserDto extends PickType(UserDto, [
  'email',
  'firstName',
  'lastName',
  'bio',
  'phone',
  'image',
  'isActive',
  'id',
  'authMethod',
] as const) {}
