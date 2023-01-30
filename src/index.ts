import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

class App {
  public app: Application;
  public static port: number = 80;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.set("json spaces", 4);
    this.app.use(morgan("dev"));
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.status(200).json({
        statusCode: 200,
        message: "Server is Running",
      });
    });

    this.app.route("/post").post((req: Request, res: Response) => {
      res.send(req.body);
    });
  }
}

// ==> Run Serve
const app = new App().app;
app.listen(App.port, () => {
  console.log("Server running at http://localhost:" + App.port);
});
