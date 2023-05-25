import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 유저 생성
  @Post('/create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  // 한 명의 유저 찾기
  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    console.log(user);
    return user;
  }

  // 유저 정보 업데이트
  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    console.log(user);
    return this.userService.updateUser(email, user);
  }

  // 유저 삭제
  @Delete('/delete/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }

  // OTP Send
  @Get('send-otp')
  async sendOtp(@Query('email') email: string): Promise<string> {
    await this.userService.sendOtpEmail(email);
    return 'OTP has been sent to your email';
  }

  // OTP Verify
  @Post('verify-otp')
  async verifyOtp(
    @Body() body: { email: string; otp: string },
  ): Promise<string> {
    const { email, otp } = body;
    const result = await this.userService.verifyOtp(email, otp);

    if (result) {
      return 'OTP verified successfully';
    } else {
      return 'OTP verification failed';
    }
  }
}
