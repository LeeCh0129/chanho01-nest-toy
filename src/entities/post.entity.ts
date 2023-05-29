import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PostStatus } from '../posts/post-status.enum';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.PUBLIC,
  })
  status: PostStatus;

  @ManyToOne(() => User, (user) => user.posts)
  // @JoinColumn({ name: 'userId' }) // 외래 키를 userId로 지정
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
