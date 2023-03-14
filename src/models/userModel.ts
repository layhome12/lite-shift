import modelInterface from "../blueprints/model";
import baseModel from "./baseModel";
import User from "./entities/User";

class userModel extends baseModel implements modelInterface {
  public async getResult(): Promise<any> {
    return await this.db.getRepository(User).find({
      select: {
        id: true,
        username: true,
        password: true,
        user_email: true,
        user_nama: true,
        user_img: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async getData(id: number): Promise<any> {
    return await this.db.getRepository(User).findOne({
      where: {
        id,
      },
    });
  }

  public async createData(data: User): Promise<any> {
    return await this.db.getRepository(User).save(data);
  }

  public async updateData(data: User, id: number): Promise<any> {
    return await this.db.getRepository(User).update(id, data);
  }

  public async destroyData(id: number): Promise<any> {
    return await this.db.getRepository(User).delete(id);
  }

  public async getUserAuth(username: string): Promise<any> {
    return this.db.getRepository(User).findOne({
      where: {
        username,
      },
    });
  }
}

export default new userModel();
