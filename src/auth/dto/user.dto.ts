import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SignInType } from '../enums/signInType';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  password: string;
  @IsEnum(SignInType)
  @IsOptional()
  authMethod: string;
  @IsString()
  @IsOptional()
  image: string;
  @IsString()
  @IsOptional()
  bio: string;
  @IsString()
  @IsOptional()
  phone: string;
  @IsBoolean()
  isActive: boolean;
  @IsDate()
  createdAt: Date;
}
