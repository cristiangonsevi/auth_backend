import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto';
import { User } from '../entity/user.entity';

@Injectable()
export class RegisterService {
  logger: Logger = new Logger('RegisterService');
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}
  async register(dto: RegisterUserDto): Promise<User> {
    try {
      return await this._userRepository.save(dto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error registering user');
    }
  }
}
