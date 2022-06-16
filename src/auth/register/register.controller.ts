import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RegisterUserDto, UserDto, GoogleUserDto } from '../dto';
import { SignInType } from '../enums/signInType';
import { RegisterService } from './register.service';
import * as bcrypt from 'bcrypt';
import { GoogleAuthService } from '../services/google-auth.service';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly _registerService: RegisterService,
    private _googleAuthService: GoogleAuthService,
  ) {}
  @Post()
  async register(
    @Query('auth') authMetod: SignInType = SignInType.EMAIL,
    @Body() dto: RegisterUserDto,
  ): Promise<any> {
    if (!SignInType[authMetod.toUpperCase()]) {
      throw new BadRequestException('Invalid auth method');
    }
    const existUser = await this._registerService.findUserByEmail(dto.email);
    if (existUser) {
      throw new BadRequestException('User already exists');
    }
    dto.password = await bcrypt.hash(dto.password, 10);
    dto.authMethod = authMetod;
    // return dto;
    await this._registerService.register(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
    };
  }
  @Post(':authMethod')
  async registerGoogle(
    @Param('authMethod') authMethod,
    @Body() dto: GoogleUserDto,
  ): Promise<any> {
    if (!SignInType[authMethod.toUpperCase()]) {
      throw new BadRequestException('Invalid auth method');
    }

    let user: UserDto = new UserDto();
    const signUp = {
      google: async () => {
        user = await this._googleAuthService.getGoogleClient(dto.token);
        user.authMethod = SignInType.GOOGLE;
        return user;
      },
      notFound: () => {
        return 'Auth method not found';
      },
    };
    try {
      signUp[authMethod] ? await signUp[authMethod]() : signUp.notFound();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!user.email) {
      throw new BadRequestException('Auth method currently not supported');
    }
    const existUser = await this._registerService.findUserByEmail(user.email);
    if (existUser) {
      throw new BadRequestException('User already exists');
    }
    user.password = ':)';
    await this._registerService.register(user);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
    };
  }
}
