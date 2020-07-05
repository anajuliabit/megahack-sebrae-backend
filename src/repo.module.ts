import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import User from './db/entity/user.entity';
import Consumer from './db/entity/consumer.entity';
import Pizza from './db/entity/pizza.entity';
import Request from './db/entity/request.entity';
import Drink from './db/entity/drink.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Consumer, Pizza, Drink, Request])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
