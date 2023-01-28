import express, { Application, Request, Response } from "express";

class App {
  public app: Application;
  public static port: number = 80;

  constructor() {
    this.app = express();
    this.routes();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Okee");
    });
  }
}

// ==> Run Serve
const app = new App().app;
app.listen(App.port, () => {
  console.log("Server running at http://localhost:" + App.port);
});
