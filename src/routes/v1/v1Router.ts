import { Request, Response } from "express";
import baseRouter from "../baseRouter";

class v1Router extends baseRouter {
  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.json({
        statusCode: 200,
        message: "End Point API v1",
      });
    });
  }
}

export default new v1Router().router;
