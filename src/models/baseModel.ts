import { DataSource } from "typeorm";
import database from "../config/database";

abstract class baseModel {
  protected db: DataSource;

  constructor() {
    this.db = database;
  }
}

export default baseModel;
