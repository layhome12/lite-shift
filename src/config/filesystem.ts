import multer, { diskStorage, StorageEngine } from "multer";
import path from "path";
import md5 from "md5";
import { NextFunction, Request, Response } from "express";
import { cSystem } from "../libraries/coreSystem";

type initialize = {
  dest: string;
  mimes: Array<string>;
  limit: number;
};
type destCallback = (error: Error | null, destination: string) => void;
type fileNameCallback = (error: Error | null, filename: string) => void;

class fileSystem {
  private fileMimes: Array<string>;
  private dest: string;
  private limit: number;
  private field: string;

  constructor(field: string, init: initialize) {
    this.fileMimes = init.mimes;
    this.dest = init.dest;
    this.limit = init.limit * 1024;
    this.field = field;
  }

  public singleUpload(req: Request, res: Response, next: NextFunction) {
    let upload = multer({
      storage: this.diskStore(this.dest),
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        callback: any
      ): void => {
        let mimes: Array<string> = this.fileMimes;
        if (!mimes.includes(file.mimetype))
          return callback(new Error("File extension is not valid"), false);
        callback(null, true);
      },
      limits: {
        fileSize: this.limit,
      },
    }).single(this.field);

    // ==> Uploading File
    try {
      upload(req, res, (error) => {
        if (error)
          return cSystem.response(res, {
            statusCode: 400,
            message: error.message,
          });

        next();
      });
    } catch (error) {
      return cSystem.response(res, {
        statusCode: 500,
        message: "Error when uploading file, please try again",
      });
    }
  }

  public multipleUpload(req: Request, res: Response, next: NextFunction) {
    let upload = multer({
      storage: this.diskStore(this.dest),
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        callback: any
      ): void => {
        let mimes: Array<string> = this.fileMimes;
        if (!mimes.includes(file.mimetype))
          return callback(new Error("File extension is not valid"), false);
        callback(null, true);
      },
      limits: {
        fileSize: this.limit,
      },
    }).array(this.field);

    // ==> Uploading File
    try {
      upload(req, res, (error) => {
        if (error)
          return cSystem.response(res, {
            statusCode: 400,
            message: error.message,
          });

        next();
      });
    } catch (error) {
      return cSystem.response(res, {
        statusCode: 500,
        message: "Error when uploading file, please try again",
      });
    }
  }

  private diskStore(dest: string = ""): StorageEngine {
    return diskStorage({
      destination: (
        req: Request,
        file: Express.Multer.File,
        callback: destCallback
      ): void => {
        callback(null, dest);
      },
      filename: (
        req: Request,
        file: Express.Multer.File,
        callback: fileNameCallback
      ): void => {
        callback(
          null,
          md5(Date.now().toString()) + path.extname(file.originalname)
        );
      },
    });
  }
}

export default fileSystem;
