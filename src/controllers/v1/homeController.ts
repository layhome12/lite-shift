import { Request, Response } from "express";
import controllerInterface from "../../blueprints/controller";
import userModel from "../../models/userModel";
import baseController from "../baseController";

class homeController extends baseController implements controllerInterface {
  public async index(req: Request, res: Response): Promise<Response> {
    let data = await userModel.getResult();
    return res.json({
      statusCode: 200,
      message: "Home Controller",
      data: data,
    });
  }
}

export default new homeController();
