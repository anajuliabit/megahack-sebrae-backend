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
  @Column({ name: 'user_id' })
  userId: number;

  @Field(() => User)
  user: User;

  @ManyToOne(
    () => User,
    user => user.consumerConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>;

  @OneToMany(
    () => Request,
    requests => requests.consumer,
  )
  requests: Promise<Request[]>;
}
