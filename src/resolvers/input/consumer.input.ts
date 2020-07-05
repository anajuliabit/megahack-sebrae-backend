import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class ConsumerInput {
  @Field()
  readonly name: string;
  @Field()
  readonly chair: number;
  @Field()
  readonly userId: number;
}
