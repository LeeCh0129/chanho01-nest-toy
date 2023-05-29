import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../entities/post.entity';
import { PostRepository } from './post.repository';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';
import { Comment } from 'src/entities/comment.entity';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    // TypeOrmExModule.forCustomRepository([PostRepository]),
    TypeOrmModule.forFeature([Posts, Comment]),
    CommentsModule,
    PassportModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
