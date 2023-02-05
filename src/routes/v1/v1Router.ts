import userController from "../../controllers/v1/userController";
import userFileUploads from "../../middlewares/fileuploads/v1/userFileUploads";
import userValidation from "../../middlewares/validations/v1/userValidation";
import baseRouter from "../baseRouter";

class v1Router extends baseRouter {
  public routes(): void {
    // ==> Users
    this.router.get("/user", userController.index);
    this.router.get("/user/:id", userController.show);
    this.router.post(
      "/user",
      [userFileUploads.uploadImage, userValidation.create],
      userController.store
    );
    this.router.put(
      "/user/:id",
      [userValidation.update],
      userController.update
    );
    this.router.delete("/user/:id", userController.destroy);
  }
}

export default new v1Router().router;
