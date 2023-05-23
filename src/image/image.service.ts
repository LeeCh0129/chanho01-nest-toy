import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as AWS from 'aws-sdk';

@Injectable()
export class ImageService {
  private s3: AWS.S3;

  constructor() {
    dotenv.config();

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    this.s3 = new AWS.S3();
  }

  async upload(file: any) {
    const result = await this.s3
      .upload({
        Bucket: 'leechbuck',
        Key: `uploadFolder/${file.originalname}`,
        Body: file.buffer,
      })
      .promise();
    return result;
  }
}
