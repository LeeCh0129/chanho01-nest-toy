import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PostStatus } from './post-status.enum';
import { User } from '../user/user.entity';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
  @JoinColumn({ name: 'userId' }) // 외래 키를 userId로 지정
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
