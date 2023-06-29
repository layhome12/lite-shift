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
      console.log(
        "\u001b[36m%s\x1b[0m",
        "[lite-shift]",
        `DB connected successful`
      );
    })
    .catch((err: Error) => {
      console.log("\u001b[36m%s\x1b[0m", "[lite-shift]", `DB connecting error`);
    });
}

export default dbConfig;
