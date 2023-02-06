import multer, { diskStorage, StorageEngine } from "multer";
import path from "path";
import md5 from "md5";
import { NextFunction, Request, Response } from "express";
import { cSystem } from "../libraries/coreSystem";

type initialize = {
  dest: string | object;
  mimes: Array<string> | object;
  limit: number;
};
type destCallback = (error: Error | null, destination: string) => void;
type fileNameCallback = (error: Error | null, filename: string) => void;

class fileSystem {
  private fileMimes: Array<string> | object;
  private dest: string | object;
  private limit: number;
  private field: string | Array<any>;

  constructor(field: string | Array<any>, init: initialize) {
    this.fileMimes = init.mimes;
    this.dest = init.dest;
    this.limit = init.limit * 1024;
    this.field = field;
  }

  public singleUpload(req: Request, res: Response, next: NextFunction) {
    let upload = multer({
      storage: this.diskStore(this.dest.toString()),
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        callback: any
      ): void => {
        let mimes: Array<string> | any = this.fileMimes;
        if (!mimes.includes(file.mimetype))
          return callback(new Error("File extension is not valid"), false);
        callback(null, true);
      },
      limits: {
        fileSize: this.limit,
      },
    }).single(this.field.toString());

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
      storage: this.diskStore(this.dest.toString()),
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        callback: any
      ): void => {
        let mimes: Array<string> | any = this.fileMimes;
        if (!mimes.includes(file.mimetype))
          return callback(new Error("File extension is not valid"), false);
        callback(null, true);
      },
      limits: {
        fileSize: this.limit,
      },
    }).array(this.field.toString());

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

  public multipleField(req: Request, res: Response, next: NextFunction) {
    let fields: any = this.field;
    let upload = multer({
      storage: this.multipleDiskStore(this.dest),
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        callback: any
      ): void => {
        let mimes: Array<string> | any = this.fileMimes;
        let fileMimes: Array<string> = [];

        fileMimes = !Array.isArray(mimes) ? mimes[file.fieldname] : mimes;
        if (!fileMimes.includes(file.mimetype))
          return callback(new Error("File extension is not valid"), false);
        callback(null, true);
      },
      limits: {
        fileSize: this.limit,
      },
    }).fields(fields);

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

  private multipleDiskStore(dest: object | string): StorageEngine {
    return diskStorage({
      destination: (
        req: Request,
        file: Express.Multer.File,
        callback: destCallback
      ): void => {
        let destSave: string;
        let typeDest: string = typeof dest;

        if (typeDest == "object") {
          let destOb: any = dest;
          destSave = destOb[file.fieldname];
        } else {
          destSave = dest.toString();
        }

        callback(null, destSave);
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
