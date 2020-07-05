import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import Pizza from 'src/db/entity/pizza.entity';
import PizzaInput from './input/pizza.input';
import { EnumPizza } from '../db/entity/pizza.entity';

@Resolver(Pizza)
export default class PizzaResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Pizza])
  public async pizzas(): Promise<Pizza[]> {
    return await this.repoService.pizzaRepo.find();
  }

  @Query(() => Pizza, { nullable: true })
  public async pizza(@Args('id') id: number): Promise<Pizza> {
    return await this.repoService.pizzaRepo.findOne(id);
  }

  @Query(() => [Pizza])
  public async filterPizza(@Args('type') type: EnumPizza): Promise<Pizza[]> {
    return await this.repoService.pizzaRepo.find({ where: { type } });
  }

  @Mutation(() => Pizza)
  public async createPizza(@Args('data') input: PizzaInput): Promise<Pizza> {
    const pizza: Pizza = this.repoService.pizzaRepo.create({
      name: input.name,
      description: input.description,
      type: input.type,
      urlImage: input.urlImage,
      status: input.status,
    });
    return await this.repoService.pizzaRepo.save(pizza);
  }

  @Mutation(() => Pizza)
  public async deletePizza(@Args('id') id: number): Promise<Pizza> {
    const pizza: Promise<Pizza> = this.repoService.pizzaRepo.findOneOrFail(id);
    if (pizza) {
      await this.repoService.pizzaRepo.delete(id);
    }
    return pizza;
  }
}
