import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import v1Router from "./routes/v1/v1Router";

class App {
  public app: Application;
  public static port: number = 80;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.set("json spaces", 4);
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        statusCode: 200,
        message: "Server is running..",
      });
    });

    /*
     * -------------------------------
     * Route API Version
     * -------------------------------
     */

    this.app.use("/api/v1", v1Router);
  }
}

const app = new App().app;
app.listen(App.port, () => {
  console.log("Server running at http://localhost:" + App.port);
});
