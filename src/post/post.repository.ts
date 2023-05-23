import { CustomRepository } from 'src/typeorm/typeorm-ex.decorator';
import { Posts } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './create-post.dto';
import { PostStatus } from './post-status.enum';
import { User } from 'src/user/user.entity';

@CustomRepository(Posts)
export class PostRepository extends Repository<Posts> {
  async createPost(createPostDto: CreatePostDto, user: User): Promise<Posts> {
    const { title, content } = createPostDto;
    const post = this.create({
      title: title,
      content: content,
      status: PostStatus.PUBLIC,
      user,
    });
    await this.save(post);
    return post;
  }
}
