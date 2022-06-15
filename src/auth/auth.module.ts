import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { GoogleAuthService } from './services/google-auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [RegisterController, LoginController],
  providers: [RegisterService, LoginService, GoogleAuthService],
})
export class AuthModule {}
