import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import User from './user.entity';

@Entity({ name: 'consumers' })
export default class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  chair: number;

  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.consumers,
  )
  user: User;
}
