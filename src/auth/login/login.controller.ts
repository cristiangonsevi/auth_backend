import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from '../dto/login.dto';
import { LoginService } from './login.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto';

@Controller('login')
export class LoginController {
  constructor(private readonly _loginService: LoginService) {}
  @Post()
  @HttpCode(200)
  async login(@Body() dto: LoginUserDto): Promise<any> {
    const user: UserDto = await this._loginService.login(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const validPass = await bcrypt.compare(dto.password, user.password);
    if (!validPass) {
      throw new NotFoundException('Password is incorrect');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: user,
    };
  }
}
