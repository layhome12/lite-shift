import { Request, Response } from "express";
import config from "../../config/config";
import { cSystem } from "../../libraries/coreSystem";
import baseController from "../baseController";

class mediaController extends baseController {
  public index(req: Request, res: Response) {
    let select: number = parseInt(req.params.id);
    let listFilm: Array<string> = [
      "/videos/rokuaka/1.mp4",
      "/videos/rokuaka/2.mp4",
      "/videos/rokuaka/3.mp4",
      "/videos/rokuaka/4.mp4",
      "/videos/rokuaka/5.mp4",
      "/videos/rokuaka/6.mp4",
      "/videos/rokuaka/7.mp4",
      "/videos/rokuaka/8.mp4",
      "/videos/rokuaka/9.mp4",
      "/videos/rokuaka/10.mp4",
      "/videos/rokuaka/11.mp4",
      "/videos/rokuaka/12.mp4",
    ];

    cSystem.mediaStream(req, res, config.safeDir(listFilm[select - 1]));
  }
}

export default new mediaController();
