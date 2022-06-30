import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './services/user.service';
import { hashSync } from 'bcrypt';
import { UpdateUserPasswordDto } from './dto/updatePassword.dto';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}
  @Put(':id')
  async updateUserData(
    @Body() dto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this._userService.updateUser(dto, id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated succesfully',
    };
  }
  @Put(':id/password')
  async updatePassword(
    @Body() dto: UpdateUserPasswordDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const hashedPass = hashSync(dto.password, 10);
    await this._userService.updateUserPassword(hashedPass, id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Password updated succesfully',
    };
  }
}
