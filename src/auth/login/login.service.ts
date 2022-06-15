import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  async login(where: Record<string, unknown>): Promise<User> {
    try {
      return await this._userRepository.findOneBy(where);
    } catch (error) {
      console.log(error);
    }
  }
}
