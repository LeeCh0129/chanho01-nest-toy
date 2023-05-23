import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Posts } from './post.entity';
import { User } from 'src/user/user.entity';
import { CreatePostDto } from './create-post.dto';
import { PostStatus } from './post-status.enum';
import { UpdatePostDto } from './update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts(user: User): Promise<Posts[]> {
    const query = this.postRepository.createQueryBuilder('post');
    query.where('post.userId = :postId', { userId: user.id });
    query.orderBy('post.updatedAt', 'DESC');
    const posts = await query.getMany();
    return posts;
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Posts> {
    return this.postRepository.createPost(createPostDto, user);
  }

  async getPostById(id: number): Promise<Posts> {
    const found = await this.postRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Post with id ${id}`);
    }
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
