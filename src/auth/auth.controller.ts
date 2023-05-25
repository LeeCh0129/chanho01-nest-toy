import { Controller, Get, UseGuards, Req, Render, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { RequestWithUser } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Get('login')
  @Render('login')
  renderLogin() {
    return { title: 'Login' };
  }

  // Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = req.user;
    const payload: JwtPayload = {
      sub: user.providerId,
      email: user.email,
      userId: user.userId,
    };
    const { accessToken, refreshToken } = await this.authService.getToken(
      payload,
    );

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);
    console.log(accessToken);
    return res.redirect('/');
  }

  // Naver
  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverAuth(@Req() req) {}

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async naverAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = req.user;
    const payload: JwtPayload = {
      sub: user.providerId,
      email: user.email,
      userId: user.userId,
    };
    const { accessToken, refreshToken } = await this.authService.getToken(
      payload,
    );

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);
    console.log(accessToken);
    return res.redirect('/');
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {
    return;
  }

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = req.user;
    const payload: JwtPayload = {
      sub: user.providerId,
      email: user.email,
      userId: user.userId,
    };
    const { accessToken, refreshToken } = await this.authService.getToken(
      payload,
    );

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);
    console.log(accessToken);
    return res.redirect('/');
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const user = req.user;
    const payload: JwtPayload = {
      sub: user.providerId,
      email: user.email,
      userId: user.userId,
    };
    const { accessToken, refreshToken } = await this.authService.getToken(
      payload,
    );

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);
    console.log(accessToken);
    return res.redirect('/');
  }
}
