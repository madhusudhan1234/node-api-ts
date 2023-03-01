import "reflect-metadata";
import { DataSource } from "typeorm";
import { Author } from "./entities/Author";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "bookie",
  synchronize: false,
  logging: ["query"],
  entities: [Author],
  migrations: ["src/database/migrations/**/*.ts"],
  subscribers: [],
});
