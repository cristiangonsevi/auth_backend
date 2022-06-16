import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleUserDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
