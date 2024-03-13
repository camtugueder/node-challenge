import { DataSource } from "typeorm"
import 'dotenv/config'

(function(){
  console.log(process.env)
})()
export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: process.env.DATABASE_HOST, // Use environment variable
  port: +process.env.DATABASE_PORT, // Convert string to number with +
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  migrationsRun: false,
  entities: [`${__dirname}/**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });