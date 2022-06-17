import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubAuthService {
  verifyUser(token: string) {
    console.log(token);
    return token;
  }
}
