import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import User from './user.entity';
import Request from './request.entity';

@ObjectType()
@Entity({ name: 'consumers' })
export default class Consumer {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  chair: number;

  @Field()
  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.consumers,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @OneToMany(
    () => Request,
    requests => requests.consumer,
  )
  requests: Promise<Request[]>;
}
