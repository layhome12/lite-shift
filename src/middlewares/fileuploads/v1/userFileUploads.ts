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

  public uploadFields(req: Request, res: Response, next: NextFunction) {
    let uploads = new fileSystem(
      [
        {
          name: "user_img_1",
          maxCount: 1,
        },
        {
          name: "user_img_2",
          maxCount: 1,
        },
      ],
      {
        dest: {
          user_img_1: config.publicDir("/images"),
          user_img_2: config.publicDir("/images"),
        },
        mimes: {
          user_img_1: ["image/jpg", "image/jpeg", "image/png"],
          user_img_2: ["image/jpg", "image/jpeg", "image/png"],
        },
        limit: 1 * 512,
      }
    );

    uploads.multipleField(req, res, next);
  }
}

export default new userFileUploads();
