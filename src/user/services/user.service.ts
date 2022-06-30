import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';
import { UpdateUserDto } from '../dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}
  async updateUser(dto: UpdateUserDto, id: number) {
    try {
      return await this._userRepository.update(id, dto);
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
}
