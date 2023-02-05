import { NextFunction, Request, Response } from "express";
import config from "../../../config/config";
import fileSystem from "../../../config/filesystem";

class userFileUploads {
  public uploadImage(req: Request, res: Response, next: NextFunction) {
    let uploads = new fileSystem("user_img", {
      dest: config.publicDir("/images"),
      mimes: ["image/jpg", "image/jpeg", "image/png"],
      limit: 1 * 512,
    });

    uploads.singleUpload(req, res, next);
  }
}

export default new userFileUploads();
