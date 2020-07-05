import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
// import { TypePizza } from 'src/enum/type-pizza.enum';
import RequestPizza from './request-pizza.entity';

export enum TypePizza {
  Salgada,
  Doce,
  Vegetariana,
  Especial,
}
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

  @Field()
  @Column()
  type: TypePizza;

  @Field()
  @Column('url_image')
  urlImage: string;

  @Field()
  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @Field()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => RequestPizza,
    requestPizza => requestPizza.request,
  )
  requestsPizza: Promise<RequestPizza[]>;
}
