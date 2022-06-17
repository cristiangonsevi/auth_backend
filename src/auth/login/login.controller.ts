import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { LoginUserDto } from '../dto/login.dto';
import { LoginService } from './login.service';
import * as bcrypt from 'bcrypt';
import { GoogleUserDto, UserDto } from '../dto';
import { GoogleAuthService } from '../services/google-auth.service';
import { SignInType } from '../enums/signInType';
import { GithubAuthService } from '../services/github-auth.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly _loginService: LoginService,
    private _googleAuthService: GoogleAuthService,
    private _githubAuthService: GithubAuthService,
  ) {}
  @Post()
  @HttpCode(200)
  async login(@Body() dto: LoginUserDto): Promise<any> {
    const user: UserDto = await this._loginService.login({
      email: dto.email,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const validPass = await bcrypt.compare(dto.password, user.password);
    if (!validPass) {
      throw new NotFoundException('Password is incorrect');
    }
    delete user.password;
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: user,
    };
  }
  @Post(':authMethod')
  async loginCustomAuth(
    @Param('authMethod') authMethod,
    @Body() dto: GoogleUserDto,
  ) {
    if (!SignInType[authMethod.toUpperCase()]) {
      throw new BadRequestException('Invalid auth method');
    }
    let user: UserDto;
    const signIp = {
      google: async () => {
        user = await this._googleAuthService.getGoogleClient(dto.token);
        return user;
      },
      notFound: () => {
        throw new BadRequestException('Auth method currently not supported');
      },
    };
    try {
      (signIp[authMethod] && (await signIp[authMethod]())) || signIp.notFound();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
    const existUser: UserDto = await this._loginService.login({
      email: user.email,
      authMethod: user.authMethod,
    });
    if (!existUser) {
      throw new NotFoundException('User not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: existUser,
    };

    return authMethod;
  }
  @Get('github/callback')
  async loginGithub(@Res() res: any, @Query() params: { code: string }) {
    this._githubAuthService.verifyUser(params.code);
    return res.send(`<script>window.close();</script>`);
  }
}
