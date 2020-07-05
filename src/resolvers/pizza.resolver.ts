import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import Pizza, { StatusPizza, EnumPizza } from 'src/db/entity/pizza.entity';
import PizzaInput from './input/pizza.input';
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
  public async filterPizza(
    @Args('types', { name: 'types', type: () => [EnumPizza], nullable: true })
    types: EnumPizza[],
    @Args('status', {
      name: 'status',
      type: () => [StatusPizza],
      nullable: true,
    })
    status: StatusPizza[],
  ): Promise<Pizza[]> {
    let sql = 'SELECT * FROM pizza p';
    if (types) {
      const typesFormat = types.map(type => `'${type}'`).join(',');
      sql += ` WHERE p.type IN (${typesFormat})`;
    }
    if (status) {
      const statusFormat = status.map(status => `'${status}'`).join(',');
      sql += types
        ? `AND p.status IN (${statusFormat})`
        : `WHERE p.status IN (${statusFormat})`;
    }
    return await this.repoService.pizzaRepo.query(sql);
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
