interface modelInterface {
  getResult(): Promise<any>;
  getData(id: number): Promise<any>;
  createData(data: any): Promise<any>;
  updateData(data: any, id: number): Promise<any>;
  destroyData(id: number): Promise<any>;
}

export default modelInterface;
