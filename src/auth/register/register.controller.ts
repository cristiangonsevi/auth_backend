import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
} from '@nestjs/common';
import { RegisterUserDto } from '../dto';
import { SignInType } from '../enums/signInType';
import { RegisterService } from './register.service';
import * as bcrypt from 'bcrypt';

@Controller('register')
export class RegisterController {
  constructor(private readonly _registerService: RegisterService) {}
  @Post()
  async register(
    @Query('auth') authMetod: SignInType = SignInType.EMAIL,
    @Body() dto: RegisterUserDto,
  ): Promise<any> {
    if (!SignInType[authMetod.toUpperCase()]) {
      throw new BadRequestException('Invalid auth method');
    }
    dto.password = await bcrypt.hash(dto.password, 10);
    dto.authMethod = authMetod;
    return await this._registerService.register(dto);
  }
}
