import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './services/user.service';
import { hashSync } from 'bcrypt';
import { UpdateUserPasswordDto } from './dto/updatePassword.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';

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
  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(__dirname, '../public/images/users'),
        filename: (req, file, cb) => {
          const fileName = `${req.params.id}-user`;
          cb(null, fileName + extname(file.originalname));
        },
      }),
    }),
  )
  async updateImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this._userService.updateUserImage(file.filename, id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Image updated succesfully',
      file,
    };
  }
  @Get('image')
  async getFile(@Res() res: Response, @Query('name') image: string) {
    const isImgExternal = image.search(/http/);
    if (isImgExternal >= 0) {
      return res.end(await this._userService.getBase64(image));
    }
    const file = join(__dirname, '../public/images/users/' + image);
    res.sendFile(file);
  }
}
