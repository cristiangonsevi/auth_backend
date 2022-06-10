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

@Controller('login')
export class LoginController {
  constructor(private readonly _loginService: LoginService) {}
  @Post()
  @HttpCode(200)
  async login(@Body() dto: LoginUserDto): Promise<any> {
    const user = await this._loginService.login(dto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: user,
    };
  }
}
