import authController from "../../controllers/v1/authController";
import mediaController from "../../controllers/v1/mediaController";
import userController from "../../controllers/v1/userController";
import jwtAuthentication from "../../middlewares/authentications/jwtAuthentication";
import userFileUploads from "../../middlewares/fileuploads/v1/userFileUploads";
import authValidation from "../../middlewares/validations/v1/authValidation";
import userValidation from "../../middlewares/validations/v1/userValidation";
import baseRouter from "../baseRouter";

class v1Router extends baseRouter {
  public routes(): void {
    // ==> Auth
    this.router.post("/auth", [authValidation.create], authController.index);
    this.router.get(
      "/refresh-token",
      [jwtAuthentication.refresh],
      authController.refreshToken
    );

    // ==> Users
    this.router.get("/user", [jwtAuthentication.verify], userController.index);
    this.router.get(
      "/user/:id",
      [jwtAuthentication.verify],
      userController.show
    );
    this.router.post(
      "/user",
      [
        jwtAuthentication.verify,
        userFileUploads.uploadImage,
        userValidation.create,
      ],
      userController.store
    );
    this.router.put(
      "/user/:id",
      [
        jwtAuthentication.verify,
        userFileUploads.uploadImage,
        userValidation.update,
      ],
      userController.update
    );
    this.router.delete(
      "/user/:id",
      [jwtAuthentication.verify],
      userController.destroy
    );

    // ==> Media Stream
    this.router.get("/stream/movie/:id", mediaController.index);
  }
}

export default new v1Router().router;
