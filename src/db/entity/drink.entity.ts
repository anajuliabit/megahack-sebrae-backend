import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import RequestPizza from './request-pizza.entity';
import RequestDrink from './request-drink.entity';

enum TypeDrink {
  Refrigerante,
  Suco,
  Vinho,
  Cerveja,
}

@ObjectType()
@Entity({ name: 'drink' })
export default class Drink {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  type: TypeDrink;

  @Field()
  @Column({ name: 'url_image' })
  urlImage: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => RequestDrink,
    requestDrink => requestDrink.request,
  )
  requestsDrink: Promise<RequestPizza[]>;
}
