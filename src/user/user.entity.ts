import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  // @Column({ unique: true, select: false })
  // firebaseId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDt: Date;

  @Column({ nullable: true })
  otp: string;

  @Column({ type: 'timestamp', nullable: true })
  otpCreationTime: Date;
}
