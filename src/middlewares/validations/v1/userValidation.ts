import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import baseValidation from "../baseValidation";

class userValidation extends baseValidation {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await body("username")
      .isAlphanumeric()
      .withMessage("Make sure username contains alphanumeric")
      .run(req);
    await body("password")
      .isStrongPassword()
      .withMessage("Make sure the password used is strong")
      .run(req);
    await body("user_nama")
      .matches(/^[a-zA-Z -]*$/)
      .withMessage("Make sure the name contains alpha")
      .run(req);
    await body("user_email")
      .isEmail()
      .withMessage("Make sure the email contains valid")
      .run(req);

    return super.run(req, res, next);
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await body("username")
      .isAlphanumeric()
      .withMessage("Make sure username contains alphanumeric")
      .run(req);
    await body("user_nama")
      .matches(/^[a-zA-Z -]*$/)
      .withMessage("Make sure the name contains alpha")
      .run(req);
    await body("user_email")
      .isEmail()
      .withMessage("Make sure the email contains valid")
      .run(req);
    if (req.body.password != undefined && req.body.password != "")
      await body("password")
        .isStrongPassword()
        .withMessage("Make sure the password used is strong")
        .run(req);

    return super.run(req, res, next);
  }
}

export default new userValidation();
