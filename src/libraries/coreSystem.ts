import { Response } from "express";
import moment from "moment";
import dotenv from "dotenv";

type retriveOnly = {
  statusCode: number;
  message: string;
};

type retriveData = {
  statusCode: number;
  message: string;
  data: any;
};

class cSystem {
  public static response(
    res: Response,
    data: retriveOnly | retriveData
  ): Response {
    return res.status(data.statusCode).json(data);
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

class cString {}

export { cSystem, cDate, cString };
