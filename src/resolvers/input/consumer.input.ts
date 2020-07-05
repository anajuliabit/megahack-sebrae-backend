import { Field, InputType } from '@nestjs/graphql';
import UserInput from './user.input';

@InputType()
export default class ConsumerInput {
  @Field()
  readonly name: string;
  @Field()
  readonly chair: number;
  @Field()
  readonly userId: number;
}
