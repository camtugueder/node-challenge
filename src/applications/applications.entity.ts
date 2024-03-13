import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Exclude } from 'class-transformer';

export enum ApplicationStatus {
  STARTED = 'STARTED',
  FINISHED = 'FINISHED'
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.applications)
  @JoinColumn({ name: 'userId' })
  @Exclude()
  user: User;
}
