import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Consumer from './consumer.entity';

@ObjectType()
@Entity({ name: 'users' })
export default class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  phone: number;

  @Field()
  @Column()
  table: number;

  @Field()
  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @Field()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => Consumer,
    consumers => consumers.user,
  )
  consumers: Promise<Consumer[]>;
}
