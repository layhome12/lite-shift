import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import config from "./config/config";
import v1Router from "./routes/v1/v1Router";
import { cDate, cSystem } from "./libraries/coreSystem";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use("/public", express.static(config.publicDir()));
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(
      helmet({
        crossOriginResourcePolicy: false,
      })
    );
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      return cSystem.response(res, {
        statusCode: 200,
        message: "Server is running..",
        data: {
          dateUtc: cDate.getDateNow(),
        },
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
app.listen(config.port(), () => {
  console.clear();
  console.log(
    "\u001b[36m%s\x1b[0m",
    "[lite-shift]",
    `Server running at ${config.baseUrl()}:${config.port()}`
  );
});
