import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { PostRepository } from './post.repository';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PostRepository]),
    PassportModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
