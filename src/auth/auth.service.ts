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
    console.log(user);
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
    const user = req.user;
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      userId: user.id,
    };
    const token = await this.getToken(payload);

    console.log('token:' + token);
    return {
      message: 'User information from google',
      user,
      token,
    };
  }

  async naverLogin(req) {
    if (!req.user) {
      return 'No user from Naver';
    }
    const user = req.user;
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      userId: user.id,
    };
    const token = await this.getToken(payload);

    return {
      message: 'User information from Naver',
      user,
      token,
    };
  }

  async kakaoLogin(req) {
    if (!req.user) {
      return 'No user from Kakao';
    }
    const user = req.user;
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      userId: user.id,
    };
    const token = await this.getToken(payload);

    return {
      message: 'User information from Kakao',
      user,
      token,
    };
  }

  async facebookLogin(req) {
    if (!req.user) {
      return 'No user from Facebook';
    }
    const user = req.user;
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      userId: user.id,
    };
    const token = await this.getToken(payload);

    return {
      message: 'User information from Facebook',
      user,
      token,
    };
  }
}
