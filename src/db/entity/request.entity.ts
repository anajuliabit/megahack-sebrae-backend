import { Field, ObjectType } from '@nestjs/graphql';
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
import Consumer from './consumer.entity';
import RequestPizza from './request-pizza.entity';
import RequestDrink from './request-drink.entity';
// import { StatusRequest } from 'src/enum/status-request.enum';

export enum StatusRequest {
  Waiting,
  Concluded,
}

@ObjectType()
@Entity({ name: 'requests' })
export default class Request {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  status: StatusRequest;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => Consumer,
    consumer => consumer.requests,
    { primary: true },
  )
  @JoinColumn({ name: 'consumer_id' })
  consumer: Promise<Consumer>;

  @OneToMany(
    () => RequestPizza,
    requestPizza => requestPizza.request,
  )
  requestsPizza: Promise<RequestPizza[]>;

  @OneToMany(
    () => RequestDrink,
    requestDrink => requestDrink.request,
  )
  requestsDrink: Promise<RequestDrink[]>;
}
