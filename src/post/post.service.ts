import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Posts } from '../entities/post.entity';
import { User } from 'src/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostStatus } from './post-status.enum';
import { UpdatePostDto } from './dtos/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
  ) {}
  // private readonly postRepository: PostRepository) {}

  //   async getAllPosts(user: User): Promise<Posts[]> {
  //     const query = this.postRepository.createQueryBuilder('post');
  //     query.where('post.userId = :postId', { userId: user.id });
  //     query.orderBy('post.updatedAt', 'DESC');
  //     const posts = await query.getMany();
  //     return posts;
  //   }

  async getAllPosts(): Promise<Posts[]> {
    const query = this.postRepository.createQueryBuilder('post');
    query.orderBy('post.updatedAt', 'DESC');
    const posts = await query.getMany();
    return posts;
  }

  async getMyPosts(user: User): Promise<Posts[]> {
    const query = this.postRepository.createQueryBuilder('post');
    query.where('post.userId = :userId', { userId: user.userId });
    query.orderBy('post.updatedAt', 'DESC');
    const posts = await query.getMany();
    return posts;
  }

  // async createPost(createPostDto: CreatePostDto, user: User): Promise<Posts> {
  //   return this.postRepository.createPost(createPostDto, user);
  // }

  async createPost(user: User, title: string, content: string): Promise<Posts> {
    try {
      const post = await this.postRepository.create({
        title,
        content,
        status: PostStatus.PUBLIC,
        author: user,
      });
      await this.postRepository.save(post);
      return post;
    } catch (e) {
      throw new InternalServerErrorException('게시글 작성에 실패했습니다.');
    }
  }

  async getPostById(id: number): Promise<Posts> {
    const found = await this.postRepository.findOne({ where: { postId: id } });

    if (!found) {
      throw new NotFoundException(`Can't find Post with id ${id}`);
    }
    console.log(found);
    return found;
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Post with id ${id}`);
    }
  }

  async updatePostStatus(id: number, status: PostStatus): Promise<Posts> {
    const post = await this.getPostById(id);

    post.status = status;
    return this.postRepository.save(post);
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<Posts> {
    const post = await this.getPostById(id);

    if (updatePostDto.title) {
      post.title = updatePostDto.title;
    }
    if (updatePostDto.content) {
      post.content = updatePostDto.content;
    }

    return this.postRepository.save(post);
  }
}
