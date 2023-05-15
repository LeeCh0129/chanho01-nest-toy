import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UesrModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './mails/email.controller';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { typeORMConfig } from './configs/typeorm.config';
import { NaverMapModule } from './naver-map/naver-map.module';
import { NaverMapController } from './naver-map/naver-map.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: typeORMConfig,
    }),
    // TypeOrmModule.forRoot({
    //   // sqlite 설정 메서드
    //   type: 'postgres',
    //   database: 'nest-app',
    //   entities: [User],
    //   synchronize: true, // 데이터베이스에 스키마를 동기화
    //   logging: true, // sql 실행 로그 확인
    // }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      template: {
        dir: join(__dirname, '..', 'src', 'mails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config/.env',
    }),

    WeatherModule,
    UesrModule,
    NaverMapModule,
  ],
  controllers: [AppController, EmailController, NaverMapController],
  providers: [AppService],
})
export class AppModule {}
