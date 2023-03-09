import { Request, Response } from "express";
import moment from "moment";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mime from "mime-types";
import fs from "fs";
import jwt from "jsonwebtoken";
import crypto from "crypto-js";
import { Prisma, PrismaClient } from "@prisma/client";

type retriveOnly = {
  statusCode: number;
  message: string;
};

type retriveData = {
  statusCode: number;
  message: string;
  data: any;
};

type initCreateToken = {
  secret: string | undefined;
  expired: number | string;
};

type cInfiniteInit = {
  db: Prisma.ModelName;
  args: object;
};

class cSystem {
  public static response(
    res: Response,
    data: retriveOnly | retriveData
  ): Response {
    return res.status(data.statusCode).json(data);
  }

  public static mediaStream(req: Request, res: Response, file: string) {
    let range = req.headers.range;
    if (!range)
      return res.status(400).end(
        JSON.stringify({
          statusCode: 400,
          message: "Required Range Headers",
        })
      );

    const mediaSize = fs.statSync(file).size;
    const mimeType = mime.lookup(file);

    if (mediaSize <= 0) {
      return res.status(404).end(
        JSON.stringify({
          statusCode: 404,
          message: "File media not found",
        })
      );
    }

    //==> Parse Range
    const chunkSize: number = 2 * (1024 * 1024); // 2MB
    const start: number = Number(range.replace(/\D/g, ""));
    const end: number = Math.min(start + chunkSize, mediaSize - 1);
    const contentLength = end - start + 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${mediaSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": mimeType?.toString(),
    });

    const mediaStream = fs.createReadStream(file, { start, end });
    mediaStream.pipe(res);
  }
}

class cDate {
  constructor() {
    dotenv.config();
  }

  public static getDateNow() {
    let timeZone: string = process.env.TIMEZONE_OFFSET
      ? process.env.TIMEZONE_OFFSET
      : "+0000";
    let dateNow = moment().utcOffset(timeZone).format();
    return new Date(dateNow);
  }
}

class cString {
  public static hash(str: string): Promise<string> {
    return bcrypt.hash(str, 10);
  }

  public static strEncode(str: string): string | any {
    let key = process.env.AES_SECRET_KEY
      ? process.env.AES_SECRET_KEY
      : "secret";
    return crypto.AES.encrypt(str, key).toString();
  }

  public static strDecode(str: string): string {
    let key = process.env.AES_SECRET_KEY
      ? process.env.AES_SECRET_KEY
      : "secret";
    return crypto.AES.decrypt(str, key).toString(crypto.enc.Utf8);
  }
}

class cAuth {
  public static createToken(data: object, init: initCreateToken): string {
    let token: string = jwt.sign(data, init.secret ? init.secret : "secret", {
      expiresIn: init.expired,
    });

    return token;
  }

  public static verifyToken(
    token: string,
    secret: string | undefined
  ): string | any {
    try {
      let verify = jwt.verify(token, secret ? secret : "secret");
      if (!verify) return false;
      return verify;
    } catch (error) {
      return false;
    }
  }

  public static verifyHash(str: string, hash: string): Promise<boolean> {
    return bcrypt.compare(str, hash);
  }
}

class cInfinite {
  private dbSelector: Prisma.ModelName;
  private modelSelector: object;

  constructor(init: cInfiniteInit) {
    this.dbSelector = init.db;
    this.modelSelector = init.args;
  }

  public renderData = async (): Promise<any> => {
    const dbConnect = new PrismaClient();
    const argsMany = this.modelSelector;
    return await dbConnect[this.dbSelector].findMany(argsMany);
  };
}

export { cSystem, cDate, cString, cAuth, cInfinite };
