import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { cSystem } from "../../libraries/coreSystem";

class baseValidation {
  protected run(req: Request, res: Response, next: NextFunction): any {
    let errors = validationResult(req);
    if (!errors.isEmpty())
      return cSystem.response(res, {
        statusCode: 400,
        message: "Please fill corectly",
        data: errors.array(),
      });

    next();
  }
}

export default baseValidation;
