import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-kakao';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/kakao/redirect',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, username, _json } = profile;
    const user = {
      provider: 'kakao',
      providerId: id,
      email: (_json && _json.kakao_account && _json.kakao_account.email) || '',
      username: username || '',
    };
    const userInDb = await this.authService.validateUser(user);
    done(null, userInDb);
  }
}
