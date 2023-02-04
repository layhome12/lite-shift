import { NextFunction, Request, Response } from "express";

interface validationInterface {
  create(req: Request, res: Response, next: NextFunction): Promise<any>;
  update(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export default validationInterface;
