import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Posts } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async findAllComment(
    postId: number,
    page: number,
    take: number,
  ): Promise<Comment[]> {
    try {
      const comments = await this.commentRepository
        .createQueryBuilder('comment')
        .where('comment.postPostid = :postId', { postId })
        .orderBy('comment.updatedAt', 'DESC')
        .skip(take * (page - 1))
        .take(take)
        .leftJoinAndSelect('comment.author', 'author')
        .getMany();
      return comments;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        '댓글 조회에 실패했습니다.',
        error,
      );
    }
  }

  async createComment(authorId: number, postId: number, content: string) {
    const post = new Posts();
    post.postId = postId;

    const author = new User();
    author.userId = authorId;

    const comment = this.commentRepository.create({
      author,
      post,
      content,
    });
    await this.commentRepository.save(comment);

    return { message: '댓글 작성 완료' };
  }
}
