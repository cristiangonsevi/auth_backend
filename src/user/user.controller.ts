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
}
