import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import MainSeeder from './main.seeder';
import { UsersFactory } from '../factories/users.factory';
import { User } from '../../src/users/users.entity';
import { Role } from '../../src/roles/roles.entity';
import { Application } from '../../src/applications/applications.entity';
import { RolesFactory } from '../factories/roles.factory';

const {
  DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME,
} = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: DATABASE_HOST || "localhost",
  port: Number(DATABASE_PORT) || 5432,
  username: DATABASE_USER || "postgres",
  password: DATABASE_PASSWORD || "password",
  database: DATABASE_NAME || "nest_db",
  entities: [User, Role, Application],
  // additional config options brought by typeorm-extension
  factories: [UsersFactory, RolesFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});