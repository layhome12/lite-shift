import { Router } from "express";
import routerInterface from "../blueprints/router";

abstract class baseRouter implements routerInterface {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}

export default baseRouter;
