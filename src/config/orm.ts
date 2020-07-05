import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/aplication.db',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'db', 'entity', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migration', '*')],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

module.exports = options;
