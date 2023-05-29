import { CustomRepository } from 'src/typeorm/typeorm-ex.decorator';
import { Posts } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostStatus } from './post-status.enum';
import { User } from 'src/entities/user.entity';

@CustomRepository(Posts)
export class PostRepository extends Repository<Posts> {}
