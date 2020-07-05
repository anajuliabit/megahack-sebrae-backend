import {
  Resolver,
  Args,
  Query,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import Consumer from 'src/db/entity/consumer.entity';
import ConsumerInput from './input/consumer.input';
import User from 'src/db/entity/user.entity';

@Resolver(of => Consumer)
export default class ConsumerResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Consumer])
  public async consumers(): Promise<Consumer[]> {
    return this.repoService.consumerRepo.find();
  }

  @Query(() => [Consumer])
  public async getConsumerFromUser(
    @Args('id') userId: number,
  ): Promise<Consumer[]> {
    return await this.repoService.consumerRepo.find({ where: { userId } });
  }

  @Query(() => Consumer, { nullable: true })
  public async consumer(@Args('id') id: number): Promise<Consumer> {
    return await this.repoService.consumerRepo.findOne(id);
  }

  @Mutation(() => Consumer)
  public async createConsumer(
    @Args('data') input: ConsumerInput,
  ): Promise<Consumer> {
    const consumer = this.repoService.consumerRepo.create({
      name: input.name,
      chair: input.chair,
      userId: input.userId,
    });
    return await this.repoService.consumerRepo.save(consumer);
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() parent: Consumer): Promise<User> {
    return this.repoService.userRepo.findOne(parent.userId);
  }

  @Mutation(() => Consumer)
  public async deleteConsumer(@Args('id') id: number): Promise<Consumer> {
    const consumer: Promise<Consumer> = this.repoService.consumerRepo.findOneOrFail(
      id,
    );
    if (consumer) {
      await this.repoService.consumerRepo.delete(id);
    }
    return consumer;
  }
}
