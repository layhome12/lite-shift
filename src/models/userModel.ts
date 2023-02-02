import baseModel from "./baseModel";

class userModel extends baseModel implements modelInterface {
  public async getResult(): Promise<any> {
    let data = await this.db.user.findMany();
    return data;
  }
  public async getData(): Promise<any> {}
  public async saveData(id: number, data: Array<any>): Promise<any> {}
  public async destroyData(id: number): Promise<any> {}
}

export default new userModel();
