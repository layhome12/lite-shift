import homeController from "../../controllers/v1/homeController";
import baseRouter from "../baseRouter";

class v1Router extends baseRouter {
  public routes(): void {
    this.router.get("/", homeController.index);
  }
}

export default new v1Router().router;
