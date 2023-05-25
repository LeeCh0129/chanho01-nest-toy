import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { UesrModule } from 'src/user/user.module';
import { NaverStrategy } from './strategies/naver.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 'id' },
    }),
    UesrModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    NaverStrategy,
    KakaoStrategy,
    FacebookStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
