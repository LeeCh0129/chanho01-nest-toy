import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user/user.service';
import { UesrModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './mails/email.controller';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { typeORMConfig } from './configs/typeorm.config';
import { NaverMapModule } from './naver-map/naver-map.module';
import { NaverMapController } from './naver-map/naver-map.controller';
import { UploadsModule } from './uploads/uploads.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmExModule } from './typeorm/typeorm-ex.module';
import { PostRepository } from './posts/post.repository';
import { PostModule } from './posts/post.module';
import { PassportModule } from '@nestjs/passport';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: typeORMConfig,
    }),
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

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
      exclude: ['/api*'], // optionally exclude APIs
    }),

    TypeOrmExModule.forCustomRepository([PostRepository]),
    WeatherModule,
    UesrModule,
    PostModule,
    NaverMapModule,
    UploadsModule,
    ImageModule,
    AuthModule,
    PassportModule,
    CommentsModule,
  ],
  controllers: [AppController, EmailController, NaverMapController],
  providers: [AppService],
})
export class AppModule {}
