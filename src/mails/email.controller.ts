import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { join } from 'path';

@Controller('email')
export class EmailController {
  constructor(private mailService: MailerService) {}

  @Get('plain-text-email')
  async plainTextEmail(@Query('toemail') toemail) {
    console.log(toemail);
    try {
      await this.mailService.sendMail({
        to: toemail,
        from: 'cksgh5477@gmail.com',
        subject: '한글, Nestjs mailer',
        html: '한글',
      });
    } catch (e) {
      console.log(e);
    }
    return 'success';
  }

  @Post('html-email')
  async postHtmlEmail(@Body() payload) {
    console.log(payload);
    try {
      await this.mailService.sendMail({
        to: payload.toemail,
        from: 'cksgh5477@gmail.com',
        subject: '리자노 Nestjs mailer',
        template: 'superhero.hbs',
        context: {
          superHero: payload,
        },
      });
    } catch (e) {
      console.log(e);
    }

    return 'sucess';
  }

  @Get('file-attach')
  async fileAttachment(@Query('toemail') toemail) {
    await this.mailService.sendMail({
      to: toemail,
      from: 'cksgh5477@gmail.com',
      subject: 'File Attachment',
      html: '<h1>File Attachment</h1>',
      attachments: [
        {
          path: join(__dirname, 'src/mails'),
          filename: '1.png',
          contentDisposition: 'attachment',
        },
      ],
    });
    return 'success';
  }
}
