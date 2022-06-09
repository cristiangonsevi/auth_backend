import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
  register(dto): string {
    return dto;
  }
}
