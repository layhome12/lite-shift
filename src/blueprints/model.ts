interface modelInterface {
  getResult(): Promise<any>;
  getData(): Promise<any>;
  saveData(id: number, data: Array<any>): Promise<any>;
  destroyData(id: number): Promise<any>;
}
