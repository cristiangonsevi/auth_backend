import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { UserDto } from '../../auth/dto/user.dto';

export class UpdateUserDto extends PickType(UserDto, [
  'email',
  'firstName',
] as const) {
  @IsOptional()
  @IsString()
  lastName?: string;
  @IsOptional()
  @IsString()
  bio: string;
  @IsOptional()
  @IsString()
  phone: string;
}
