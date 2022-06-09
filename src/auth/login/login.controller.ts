import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly _loginService: LoginService) {}
  @Post()
  login(@Body() dto: LoginUserDto): any {
    return this._loginService.login(dto);
  }
}
