import { InputType, Field } from '@nestjs/graphql';
import { EnumPizza, StatusPizza } from 'src/db/entity/pizza.entity';

@InputType()
export default class FilterInput {
  @Field()
  type: EnumPizza[];

  @Field()
  status: StatusPizza[];
}
