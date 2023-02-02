import { Request, Response } from "express";

interface controllerInterface {
  index(req: Request, res: Response): Promise<Response>;
}

export default controllerInterface;
