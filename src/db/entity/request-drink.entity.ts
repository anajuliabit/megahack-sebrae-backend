import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import Request from './request.entity';
import Drink from './drink.entity';

@ObjectType()
@Entity({ name: 'request_drink' })
export default class RequestDrink {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => Request,
    request => request.requestsDrink,
    { primary: true },
  )
  @JoinColumn({ name: 'request_id' })
  request: Promise<Request>;

  @ManyToOne(
    () => Drink,
    drink => drink.requestsDrink,
    { primary: true },
  )
  @JoinColumn({ name: 'drink_id' })
  drink: Promise<Drink>;
}
