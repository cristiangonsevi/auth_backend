import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class AuthModule {}
