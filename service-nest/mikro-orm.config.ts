import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { defineConfig, Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM');

const config = {
  driver: PostgreSqlDriver,
  dbName: 'postgres',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  logger: logger.log.bind(logger),
  extensions: [Migrator],
  migrations: {
    tableName: '__MikroOrmMigrations',
    path: 'dist/src/migrations',
    pathTs: 'src/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: false,
    safe: true,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
} as Options;

export default defineConfig(config);
