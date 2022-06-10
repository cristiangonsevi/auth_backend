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

  async login(email): Promise<User> {
    try {
      return await this._userRepository.findOneBy({ email: email });
    } catch (error) {
      console.log(error);
    }
  }
}
