import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class RegisterUserDto extends PickType(UserDto, [
  'email',
  'password',
  'authMethod',
  'firstName',
] as const) {
  @IsOptional()
  @IsString()
  lastName?: string;
}
