import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleAuthService {
  google_id = this._configService.get('GOOGLE_CLIENT_ID');
  constructor(private _configService: ConfigService) {}
  async getGoogleClient(token: string): Promise<any> {
    try {
      const oauth2Client = new google.auth.OAuth2(this.google_id);
      const ticket = await oauth2Client.verifyIdToken({
        idToken: token,
        audience: this.google_id,
      });
      const payload = ticket.getPayload();
      const {
        given_name: firstName,
        family_name: lastName,
        email,
        picture: image,
      } = payload;
      return { firstName, lastName, email, image };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
