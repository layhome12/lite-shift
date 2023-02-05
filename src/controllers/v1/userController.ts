import { Request, Response } from "express";
import controllerInterface from "../../blueprints/controller";
import userModel from "../../models/userModel";
import baseController from "../baseController";
import { cDate, cString, cSystem } from "../../libraries/coreSystem";
import filesystem from "../../config/filesystem";
import config from "../../config/config";

class userController extends baseController implements controllerInterface {
  public async index(req: Request, res: Response): Promise<Response> {
    let data = await userModel.getResult();
    return cSystem.response(res, {
      statusCode: 200,
      message: "Fetching data successful",
      data: data,
    });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    let id: number = parseInt(req.params.id);
    let data = await userModel.getData(id);

    if (!data)
      return cSystem.response(res, {
        statusCode: 404,
        message: "Data Not Found",
      });

    return cSystem.response(res, {
      statusCode: 200,
      message: "Fetching data successful",
      data: data,
    });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    console.log(req.files);

    return cSystem.response(res, {
      statusCode: 200,
      message: "Testing Upload File",
    });

    let hashPass = await cString.hash(req.body.password);
    try {
      await userModel.createData({
        username: req.body.username,
        password: hashPass,
        user_nama: req.body.user_nama,
        user_email: req.body.user_email,
        user_img: null,
        created_at: cDate.getDateNow(),
        updated_at: null,
      });
    } catch (error) {
      return cSystem.response(res, {
        statusCode: 500,
        message: "Error while saving data",
      });
    }

    return cSystem.response(res, {
      statusCode: 200,
      message: "Save data successful",
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    let id: number = parseInt(req.params.id);
    try {
      let data: object = {
        username: req.body.username,
        user_nama: req.body.user_nama,
        user_email: req.body.user_email,
        updated_at: cDate.getDateNow(),
      };

      if (req.body.password != "")
        Object.assign(data, {
          password: await cString.hash(req.body.password),
        });

      await userModel.updateData(data, id);
    } catch (error) {
      return cSystem.response(res, {
        statusCode: 500,
        message: "Error while updating data",
      });
    }

    return cSystem.response(res, {
      statusCode: 200,
      message: "Update data successful",
    });
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    let id: number = parseInt(req.params.id);
    try {
      await userModel.destroyData(id);
    } catch (error) {
      return cSystem.response(res, {
        statusCode: 500,
        message: "Error while deleting data",
      });
    }

    return cSystem.response(res, {
      statusCode: 200,
      message: "Delete data successful",
    });
  }
}

export default new userController();
