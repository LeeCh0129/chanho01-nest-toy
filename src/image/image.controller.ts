import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImage(@UploadedFiles() files) {
    const response = [];

    for (let file of files) {
      const result = await this.imageService.upload(file);
      response.push(result);
    }

    return response;
  }
}
