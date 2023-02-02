import database from "../config/database";
import { PrismaClient } from "@prisma/client";

abstract class baseModel {
  protected db: PrismaClient;

  constructor() {
    this.db = database;
  }
}

export default baseModel;
