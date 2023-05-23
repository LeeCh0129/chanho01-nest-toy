import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });
    return { accessToken, refreshToken };
  }

  async validateUser(user: any) {
    // look up the user in the database and return it if it exists,
    // otherwise create a new user in the database and return that.
    let userInDb = await this.userService.getUser(user.email);
    if (!userInDb) {
      userInDb = await this.userService.createUser(user);
    }
    return userInDb;
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async naverLogin(req) {
    if (!req.user) {
      return 'No user from Naver';
    }

    return {
      message: 'User information from Naver',
      user: req.user,
    };
  }

  async kakaoLogin(req) {
    if (!req.user) {
      return 'No user from Kakao';
    }

    return {
      message: 'User information from Kakao',
      user: req.user,
    };
  }

  async facebookLogin(req) {
    if (!req.user) {
      return 'No user from Kakao';
    }

    return {
      message: 'User information from Kakao',
      user: req.user,
    };
  }
}
