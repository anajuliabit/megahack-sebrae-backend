import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { StatusPizza } from 'src/enum/status-pizza.enum';
import Request from './request.entity';
import Pizza from './pizza.entity';

enum StatusPizza {
  Cooking,
  Ready,
  Next,
  Waiting,
}

@ObjectType()
@Entity({ name: 'request_pizza' })
export default class RequestPizza {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  slice: number;

  @Field()
  @Column()
  status: StatusPizza;

  @Field()
  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @Field()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => Request,
    request => request.requestsPizza,
    { primary: true },
  )
  @JoinColumn({ name: 'request_id' })
  request: Promise<Request>;

  @ManyToOne(
    () => Pizza,
    pizza => pizza.requestsPizza,
    { primary: true },
  )
  @JoinColumn({ name: 'pizza_id' })
  pizza: Promise<Pizza>;
}
