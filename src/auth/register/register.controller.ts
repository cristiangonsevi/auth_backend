import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly _registerService: RegisterService) {}
  @Post()
  register(@Body() dto: RegisterUserDto): string {
    return this._registerService.register(dto);
  }
}
