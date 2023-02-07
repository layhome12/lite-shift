import { Prisma } from "@prisma/client";
import modelInterface from "../blueprints/model";
import baseModel from "./baseModel";

class userModel extends baseModel implements modelInterface {
  public async getResult(): Promise<any> {
    return await this.db.user.findMany({
      select: {
        id: true,
        username: true,
        user_nama: true,
        user_img: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async getData(id: number): Promise<any> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        user_nama: true,
        user_img: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async createData(data: Prisma.userCreateInput): Promise<any> {
    return this.db.user.create({
      data,
    });
  }

  public async updateData(
    data: Prisma.userUpdateInput,
    id: number
  ): Promise<any> {
    return this.db.user.update({
      where: {
        id,
      },
      data,
    });
  }

  public async destroyData(id: number): Promise<any> {
    return this.db.user.delete({
      where: {
        id,
      },
    });
  }

  public async getUserAuth(username: string): Promise<any> {
    return this.db.user.findFirst({
      select: {
        id: true,
        username: true,
        password: true,
      },
      where: {
        username,
      },
    });
  }
}

export default new userModel();
