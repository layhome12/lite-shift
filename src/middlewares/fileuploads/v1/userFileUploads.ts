import { NextFunction, Request, Response } from "express";
import config from "../../../config/config";
import fileSystem from "../../../config/filesystem";

class userFileUploads {
  public uploadImage(req: Request, res: Response, next: NextFunction) {
    let uploads = new fileSystem("file", {
      dest: config.publicDir("/images"),
      mimes: ["image/jpg", "image/jpeg"],
      limit: 1 * 1024,
    });

    uploads.multipleUpload(req, res, next);
  }
}

export default new userFileUploads();
