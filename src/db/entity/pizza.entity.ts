import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import RequestPizza from './request-pizza.entity';

export enum EnumPizza {
  SALGADA,
  DOCE,
  VEGETARIANA,
  ESPECIAL,
}

registerEnumType(EnumPizza, {
  name: 'EnumPizza',
});
@ObjectType()
@Entity({ name: 'pizza' })
export default class Pizza {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => EnumPizza)
  @Column()
  type: EnumPizza;

  @Field()
  @Column({ name: 'url_image' })
  urlImage: string;

  @OneToMany(
    () => RequestPizza,
    requestPizza => requestPizza.request,
  )
  requestsPizza: Promise<RequestPizza[]>;
}
