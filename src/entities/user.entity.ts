import { Posts } from 'src/entities/post.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;

  @Column({ type: 'timestamp', nullable: true })
  otpCreationTime: Date;

  @OneToMany(() => Posts, (post) => post.author)
  posts: Posts[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDt: Date;

  @Column({ nullable: true })
  otp: string;
}
