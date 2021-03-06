import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { HttpService } from '@nestjs/axios';
import { LoginResponseUserDto } from 'src/auth/dto/loginResponse.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
    private _http: HttpService,
  ) {}
  async findUser(id: number): Promise<User> {
    try {
      return await this._userRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      new InternalServerErrorException();
    }
  }
  async updateUser(
    dto: UpdateUserDto,
    id: number,
  ): Promise<LoginResponseUserDto> {
    try {
      await this._userRepository.update(id, dto);
      return await this._userRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      new InternalServerErrorException();
    }
  }
  async updateUserPassword(password: string, id: number) {
    try {
      return await this._userRepository.update(id, { password });
    } catch (error) {
      console.log(error);
      new InternalServerErrorException();
    }
  }
  async updateUserImage(image: string, id) {
    try {
      return await this._userRepository.update(id, { image });
    } catch (error) {
      console.log(error);
      new InternalServerErrorException();
    }
  }
  getBase64(url) {
    return this._http
      .get(url, {
        responseType: 'arraybuffer',
      })
      .toPromise()
      .then((response) => {
        return Buffer.from(response.data, 'base64');
      });
  }
}
