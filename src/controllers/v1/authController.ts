import { Request, Response } from "express";
import controllerInterface from "../../blueprints/controller";
import { cAuth, cSystem } from "../../libraries/coreSystem";
import userModel from "../../models/userModel";
import baseController from "../baseController";
import dotenv from "dotenv";

class authController extends baseController implements controllerInterface {
  constructor() {
    super();
    dotenv.config();
  }
  public async index(req: Request, res: Response): Promise<Response> {
    let user: any = await userModel.getUserAuth(req.body.username);
    if (!user)
      return cSystem.response(res, {
        statusCode: 404,
        message: "Username or password incorrect",
      });

    let verify = await cAuth.verifyHash(req.body.password, user.password);
    if (!verify)
      return cSystem.response(res, {
        statusCode: 404,
        message: "Username or password incorrect",
      });

    let tokenAccess = cAuth.createToken(
      {
        id: user.id,
      },
      {
        expired: "1 days",
        secret: process.env.JWT_SECRET_KEY,
      }
    );

    let refreshToken = cAuth.createToken(
      {
        id: user.id,
      },
      {
        expired: "30 days",
        secret: process.env.JWT_SECRET_KEY + "RF",
      }
    );

    return cSystem.response(res, {
      statusCode: 200,
      message: "Login successful",
      data: {
        accessToken: tokenAccess,
        refreshToken: refreshToken,
      },
    });
  }

  public async refreshToken(req: Request, res: Response): Promise<Response> {
    let tokenAccess = cAuth.createToken(
      {
        id: res.locals.id,
      },
      {
        expired: "1 days",
        secret: process.env.JWT_SECRET_KEY,
      }
    );

    return cSystem.response(res, {
      statusCode: 200,
      message: "Refresh token successful",
      data: {
        accessToken: tokenAccess,
      },
    });
  }
}

export default new authController();
