import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "user",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "bookie",
  logging: true,
  synchronize: false,
  entities: ["src/database/entities/**/*.ts"],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
