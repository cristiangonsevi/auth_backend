import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from 'src/auth/dto/user.dto';

export class RegisterUserDto extends PartialType(UserDto) {
  @IsNotEmpty()
  password: string;
}
