import { NextFunction, Request, Response } from "express";
import { cAuth, cSystem } from "../../libraries/coreSystem";
import dotenv from "dotenv";

class jwtAuthentication {
  constructor() {
    dotenv.config();
  }

  public verify(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const tokenHeader: string | undefined =
      authHeader && authHeader.split(" ")[1];

    if (tokenHeader == undefined)
      return cSystem.response(res, {
        statusCode: 401,
        message: "Authentication is required",
      });

    let verify = cAuth.verifyToken(tokenHeader, process.env.JWT_SECRET_KEY);
    if (!verify)
      return cSystem.response(res, {
        statusCode: 401,
        message: "Token authorization is not valid",
      });

    res.locals.id = verify.id;

    next();
  }

  public refresh(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const tokenHeader: string | undefined =
      authHeader && authHeader.split(" ")[1];

    if (tokenHeader == undefined)
      return cSystem.response(res, {
        statusCode: 401,
        message: "Authentication is required",
      });

    let verify = cAuth.verifyToken(
      tokenHeader,
      process.env.JWT_SECRET_KEY + "RF"
    );
    if (!verify)
      return cSystem.response(res, {
        statusCode: 401,
        message: "Token authorization is not valid",
      });

    res.locals.id = verify.id;

    next();
  }
}

export default new jwtAuthentication();
