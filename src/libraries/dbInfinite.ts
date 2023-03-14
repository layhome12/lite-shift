import { Request } from "express";
import {
  Brackets,
  EntityTarget,
  ObjectLiteral,
  SelectQueryBuilder,
} from "typeorm";
import dbConfig from "../config/database";

type dbInit = {
  req: Request;
  entity: EntityTarget<ObjectLiteral>;
};

type outputData = {
  resultData: Array<any>;
  metaInfo: {
    page: number;
    length: number;
    show: number;
    total: number;
  };
};

type sortOrder = {
  sort?: string;
  order?: string;
};

type argsPaginate = {
  take: number;
  skip: number;
  page: number;
};

class dbInfinite {
  public DB: SelectQueryBuilder<ObjectLiteral>;
  private reqHTTP: Request;
  private entity: EntityTarget<ObjectLiteral>;
  private paginateArgs: argsPaginate;

  constructor(init: dbInit) {
    this.reqHTTP = init.req;
    this.entity = init.entity;
    this.DB = dbConfig.getRepository(this.entity).createQueryBuilder();
  }

  public renderData = async (): Promise<outputData> => {
    let resultData: ObjectLiteral[] = [];
    let countData: number = 0;

    try {
      // Count All
      this.orderByCompile();
      countData = await this.DB.getCount();

      // Result data
      this.paginateCompile();
      resultData = await this.DB.getMany();
    } catch (error) {
      console.log("dbInfinite error while compile queries");
    }

    return {
      metaInfo: {
        length: this.paginateArgs.take,
        page: this.paginateArgs.page,
        show: resultData.length
          ? this.paginateArgs.skip + resultData.length
          : 0,
        total: countData,
      },
      resultData,
    };
  };

  public search = (search: Array<string>): this => {
    const metaData = dbConfig.getMetadata(this.entity);
    const searchCompile: Array<string> = search;
    const searchParams = this.reqHTTP.body.search
      ? this.reqHTTP.body.search
      : "";

    // ==> Search Compile
    this.DB.where(
      new Brackets((db) => {
        searchCompile.forEach((value) => {
          db.orWhere(`${metaData.targetName}.${value} LIKE :${value}`, {
            [value]: `%${searchParams}%`,
          });
        });
      })
    );

    return this;
  };

  private orderByCompile = (): void => {
    const req: Request = this.reqHTTP;
    const orderParams: Array<sortOrder> = req.body.order ? req.body.order : [];

    orderParams.forEach((value) => {
      if (value?.sort && value?.order) {
        this.DB.addOrderBy(
          value.sort,
          value.order.toUpperCase() == "ASC" ? "ASC" : "DESC"
        );
      }
    });
  };

  private paginateCompile = (): void => {
    const req: Request = this.reqHTTP;
    const queryPage = req.body.page ? req.body.page : "";
    const queryLength = req.body.length ? req.body.length : "";

    // Pagination Compile
    const page: number = parseInt(queryPage) ? parseInt(queryPage) : 1;
    const length: number = parseInt(queryLength) ? parseInt(queryLength) : 10;
    const offset: number = (page - 1) * length;

    this.paginateArgs = {
      page,
      take: length,
      skip: offset,
    };

    this.DB.take(length).skip(offset);
  };
}

export default dbInfinite;
