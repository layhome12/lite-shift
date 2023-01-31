import { Request, Response } from "express";
import controllerInterface from "../../blueprints/controller";
import baseController from "../baseController";

class homeController extends baseController implements controllerInterface {
  public index(req: Request, res: Response): Response {
    return res.json({
      statusCode: 200,
      message: "Home Controller",
    });
  }
}

export default new homeController();
