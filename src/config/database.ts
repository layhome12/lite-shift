import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "../models/entities/User";

const dbConfig: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "lite_shift",
  entities: [User],
  synchronize: true,
  logging: false,
});

dbConfig
  .initialize()
  .then(() => {
    console.log("DB connected sucessful");
  })
  .catch((err: Error) => {
    console.log("DB not connecting error", err);
  });

export default dbConfig;
