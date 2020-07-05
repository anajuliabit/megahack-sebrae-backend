import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repo.module';
import UserResolver from './resolvers/user.resolver';
import ConsumerResolver from './resolvers/consumer.resolver';
import PizzaResolver from './resolvers/pizza.resolver';

import * as ormOptions from './config/orm';

const gqlImports = [UserResolver, ConsumerResolver, PizzaResolver];
@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
