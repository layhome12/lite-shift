import { Request, Response } from "express";

interface controllerInterface {
  index(req: Request, res: Response): Response;
}

export default controllerInterface;
