import { Field, InputType } from '@nestjs/graphql';
import { EnumPizza } from 'src/db/entity/pizza.entity';

@InputType()
export default class PizzaInput {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: EnumPizza;
  @Field()
  readonly urlImage: string;
}
