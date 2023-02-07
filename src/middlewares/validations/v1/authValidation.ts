import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import validationInterface from "../../../blueprints/validation";
import baseValidation from "../baseValidation";

class authValidation extends baseValidation implements validationInterface {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await body("username")
      .isAlphanumeric()
      .withMessage("Make sure username contains alphanumeric")
      .run(req);
    await body("password").notEmpty().withMessage("Password is empty").run(req);

    return super.run(req, res, next);
  }
  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    return null;
  }
}

export default new authValidation();
