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
// import { StatusPizza } from 'src/enum/status-pizza.enum';
import Request from './request.entity';
import Pizza from './pizza.entity';

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
  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
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
