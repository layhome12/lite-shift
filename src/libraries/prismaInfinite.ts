import { Prisma, PrismaClient } from "@prisma/client";
import { Request } from "express";

type initPrismaInfinite = {
  req: Request;
  db: Prisma.ModelName;
};

type argsInit = {
  select?: object | undefined;
  orderBy?: object | undefined;
  where?: object | undefined;
};

type argsPaginate = {
  take: number;
  skip: number;
  page: number;
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

class prismaInfinite {
  private reqHTTP: Request;
  private dbSelector: Prisma.ModelName;

  private selectArgs: object | undefined;
  private includeArgs: object | undefined;
  private whereArgs: object | undefined;
  private orderByArgs: Array<object> | undefined;
  private seacrhArgs: Array<string> | undefined;
  private paginateArgs: argsPaginate;

  constructor(init: initPrismaInfinite) {
    this.reqHTTP = init.req;
    this.dbSelector = init.db;
    this.paginateArgs = {
      page: 1,
      take: 10,
      skip: 0,
    };
  }

  public renderData = async (): Promise<outputData> => {
    const dbConnect = new PrismaClient();
    const argsMany = this.compileArgs();
    // @ts-ignore
    const resultData: Array<any> = await dbConnect[this.dbSelector].findMany(
      argsMany
    );
    // @ts-ignore
    const totalData: number = await dbConnect[this.dbSelector].count({
      where: this.whereArgs,
    });

    return {
      resultData,
      metaInfo: {
        page: this.paginateArgs.page,
        length: this.paginateArgs.take,
        show: resultData.length
          ? this.paginateArgs.skip + resultData.length
          : 0,
        total: totalData,
      },
    };
  };

  public select = (select: object): this => {
    this.selectArgs = select;
    return this;
  };

  public where = (where: object): this => {
    this.whereArgs = where;
    return this;
  };

  public orderBy = (order: Array<object>): this => {
    this.orderByArgs = order;
    return this;
  };

  public include = (include: object): this => {
    this.includeArgs = include;
    return this;
  };

  public search = (field: Array<string>): this => {
    this.seacrhArgs = field;
    return this;
  };

  private compileArgs = (): argsInit | object => {
    let argsMany: argsInit | object = {};

    // Build Args
    this.orderCompile();
    this.searchCompile();
    this.paginateCompile();

    // Compile Args
    Object.assign(argsMany, {
      select: this.selectArgs,
      include: this.includeArgs,
      where: this.whereArgs,
      orderBy: this.orderByArgs,
      skip: this.paginateArgs.skip,
      take: this.paginateArgs.take,
    });

    return argsMany;
  };

  private orderCompile = (): void => {
    const req: Request = this.reqHTTP;
    const orderInput = this.orderByArgs ? this.orderByArgs : [];
    const orderRequest = req.body.order ? req.body.order : [];
    const orderArgs = orderInput.concat(orderRequest);

    this.orderByArgs = orderArgs;
  };

  private searchCompile = (): void => {
    const req: Request = this.reqHTTP;
    const whereInput: object | any = this.whereArgs;
    const isArray: boolean = Array.isArray(whereInput?.OR);
    const seacrhArgs = this.seacrhArgs ? this.seacrhArgs : [];
    const whereOrArgs = whereInput ? whereInput.OR : {};

    // Search Compile
    seacrhArgs.forEach((val: string) => {
      if (isArray) {
        // Is Array
        whereOrArgs.push({
          [val]: {
            contains: req.body.search ? req.body.search : "",
          },
        });
      } else {
        // Is Object
        Object.assign(whereOrArgs, {
          [val]: {
            contains: req.body.search ? req.body.search : "",
          },
        });
      }
    });

    // Assign Args
    if (this.whereArgs) {
      Object.assign(this.whereArgs, {
        OR: whereOrArgs,
      });
    } else {
      this.whereArgs = !this.seacrhArgs
        ? this.seacrhArgs
        : {
            OR: whereOrArgs,
          };
    }
  };

  private paginateCompile = (): void => {
    const req: Request = this.reqHTTP;
    const page: number = parseInt(req.body.page) ? parseInt(req.body.page) : 1;
    const length: number = parseInt(req.body.length)
      ? parseInt(req.body.length)
      : 10;
    const offset: number = (page - 1) * length;

    // Pagination Compile
    this.paginateArgs = {
      page: page,
      take: length,
      skip: offset,
    };
  };
}

export default prismaInfinite;
