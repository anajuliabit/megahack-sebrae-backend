import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UserInput {
  @Field()
  readonly name: string;
  @Field()
  readonly phone: number;
  @Field()
  readonly table: number;
}
