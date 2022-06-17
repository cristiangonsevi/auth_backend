import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../dto';
import { GithubUserResonse } from '../interfaces/githubUserResonse.interface';

@Injectable()
export class GithubAuthService {
  githubUrlAccessToken = 'https://github.com/login/oauth/access_token';
  githubGetUserInformation = 'https://api.github.com/user';
  githubAccessToken: string;
  constructor(
    private _http: HttpService,
    private _configService: ConfigService,
  ) {}
  async verifyUser(code: string): Promise<UserDto> {
    const body = {
      client_id: this._configService.get('GITHUB_CLIENT_ID'),
      client_secret: this._configService.get('GITHUB_CLIENT_SECRET'),
      code: code,
    };
    const resp = await this.getAccessToken(body);
    this.githubAccessToken = resp.data.access_token;
    const userData = await this.getUserInformation();
    const userEmails = await this.getPrivateEmail();
    return this.formatResponse(userData.data, userEmails.data);
  }
  async getAccessToken(body: any): Promise<any> {
    return await this._http
      .post(this.githubUrlAccessToken, body, {
        headers: { Accept: 'application/json' },
      })
      .toPromise();
  }
  getUserInformation(): Promise<any> {
    return this._http
      .get(this.githubGetUserInformation, {
        headers: { Authorization: `token ${this.githubAccessToken}` },
      })
      .toPromise();
  }
  getPrivateEmail() {
    return this._http
      .get(this.githubGetUserInformation + '/emails', {
        headers: { Authorization: `token ${this.githubAccessToken}` },
      })
      .toPromise();
  }
  formatResponse(userData: GithubUserResonse, userEmails: any[]): UserDto {
    const { avatar_url: image, name, login } = userData;
    const email = userEmails.find((email) => email.primary).email;
    const resp: any = {
      firstName: name ? name.split(' ').shift() : login,
      lastName: name ? name.split(' ').pop() : '',
      image,
      email,
    };
    return resp;
  }
}
