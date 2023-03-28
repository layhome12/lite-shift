import dotenv from "dotenv";
import { DataSource } from "typeorm";
import User from "../models/entities/User";

dotenv.config();
const dbUrl: string = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";

const dbConfig: DataSource = new DataSource({
  type: "mysql",
  url: dbUrl,
  entities: [User],
  synchronize: false,
  logging: false,
});

if (dbUrl != "") {
  dbConfig
    .initialize()
    .then(() => {
      console.log("DB connected successful");
    })
    .catch((err: Error) => {
      console.log("DB connecting error", err);
    });
}

export default dbConfig;
