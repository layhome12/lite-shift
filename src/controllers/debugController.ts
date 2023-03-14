import { Request, Response } from "express";
import controllerInterface from "../blueprints/controller";
import { cSystem } from "../libraries/coreSystem";
import baseController from "./baseController";

class debugController extends baseController implements controllerInterface {
  public index = async (req: Request, res: Response): Promise<Response> => {
    return cSystem.response(res, {
      statusCode: 200,
      message: "Debug Controller",
    });
  };
}

export default new debugController();
