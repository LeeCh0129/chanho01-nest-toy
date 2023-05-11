import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateOTP } from 'src/utils/generate-otp.util';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailerService,
  ) {}
  // ❸ 유저 생성
  createUser(user): Promise<User> {
    console.log(user);
    return this.userRepository.save(user);
  }

  // ❹ 한 명의 유저 정보 찾기
  async getUser(email: string) {
    const result = await this.userRepository.findOne({
      where: { email },
    });
    return result;
  }

  // ❺ 유저 정보 업데이트. username과 password만 변경
  async updateUser(email, _user) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  // ❻ 유저 정보 삭제
  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }

  async sendOtpEmail(email: string): Promise<void> {
    const otp = generateOTP();
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      user.otp = otp;
      user.otpCreationTime = new Date();
      await this.userRepository.save(user);
    } else {
      // throw new Error('User not found');
      console.log('User not found');
      return;
    }
    await this.mailService.sendMail({
      to: email,
      from: 'cksgh5477@gmail.com',
      subject: 'Your OTP for authentication',
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });
  }
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const now = new Date();
    const otpAgeInMinutes =
      (now.getTime() - user.otpCreationTime.getTime()) / 1000 / 60;

    if (user.otp === otp && otpAgeInMinutes <= 5) {
      user.otp = null;
      user.otpCreationTime = null;
      await this.userRepository.save(user);
      return true;
    } else {
      return false;
    }
  }
}
