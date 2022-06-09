import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dto/login.dto';

@Injectable()
export class LoginService {
  login(dto: LoginUserDto): any {
    return dto;
  }
}
