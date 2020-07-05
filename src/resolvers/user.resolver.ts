import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import User from 'src/db/entity/user.entity';
import RepoService from 'src/repo.service';
import UserInput from './input/user.input';

@Resolver(User)
export default class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async findAll(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async find(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UserInput): Promise<User> {
    const user = this.repoService.userRepo.create({
      name: input.name,
      phone: input.phone,
      table: input.table,
    });
    return this.repoService.userRepo.save(user);
  }
}
