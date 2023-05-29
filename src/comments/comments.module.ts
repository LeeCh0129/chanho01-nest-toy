import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { CommentsService } from './comments.service';
import { User } from 'src/entities/user.entity';
import { Posts } from 'src/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  exports: [CommentsService],
  providers: [CommentsService],
})
export class CommentsModule {}
