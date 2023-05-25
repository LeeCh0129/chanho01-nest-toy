import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateOTP } from 'src/utils/generate-otp.util';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { OAuth2User } from 'src/auth/oauth2-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailerService,
  ) {}

  // 유저 생성
  async createUser(user): Promise<User> {
    console.log(user);
    return this.userRepository.save(user);
  }

  // 한 명의 유저 정보 찾기
  async getUser(email: string) {
    if (!email) {
      throw new BadRequestException('');
    }
    const result = await this.userRepository.findOne({
      where: { email },
    });
    return result;
  }

  // 유저 정보 업데이트. username과 password만 변경
  async updateUser(email, _user) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    // user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  // 유저 정보 삭제
  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }

  async findByProviderIdOrSave(googleUser: OAuth2User) {
    const { providerId, provider, email, username } = googleUser;

    const user = await this.userRepository.findOne({ where: { providerId } });
    if (user) {
      return user;
    }

    const newUser = new User();
    newUser.provider = provider;
    newUser.providerId = providerId;
    newUser.email = email;
    newUser.username = username;

    return await this.userRepository.save(newUser);
  }

  // OTP 생성 및 이메일 전송
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

  // OTP 검증
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    // 현재 시간과 OTP생성시간의 차이를 계산하여 생성 시간 확인
    const now = new Date();
    const otpAgeInMinutes =
      (now.getTime() - user.otpCreationTime.getTime()) / 1000 / 60;

    if (user.otp === otp && otpAgeInMinutes <= 5) {
      // user.otp = null;
      // user.otpCreationTime = null;
      user.otp = otp;
      user.otpCreationTime = now;
      await this.userRepository.save(user);
      return true;
    } else {
      return false;
    }
  }
}
