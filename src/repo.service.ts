import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from './db/entity/user.entity';
import Consumer from './db/entity/consumer.entity';
import Pizza from './db/entity/pizza.entity';
import Drink from './db/entity/drink.entity';
import Request from './db/entity/request.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Consumer)
    public readonly consumerRepo: Repository<Consumer>,
    @InjectRepository(Pizza) public readonly pizzaRepo: Repository<Pizza>,
    @InjectRepository(Drink)
    public readonly drinkRepo: Repository<Drink>,
    @InjectRepository(Request)
    public readonly requestRepo: Repository<Request>,
  ) {}
}

export default RepoService;
