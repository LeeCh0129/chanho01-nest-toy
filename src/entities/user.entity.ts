import { Posts } from 'src/entities/post.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  // @Column({ nullable: true })
  // password: string;

  @Column()
  username: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDt: Date;

  @Column({ nullable: true })
  otp: string;

  @Column({ type: 'timestamp', nullable: true })
  otpCreationTime: Date;

  @OneToMany(() => Posts, (post) => post.author)
  posts: Posts[];
}
