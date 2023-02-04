import { Prisma } from "@prisma/client";

interface modelInterface {
  getResult(): Promise<any>;
  getData(id: number): Promise<any>;
  createData(data: Prisma.userCreateInput): Promise<any>;
  updateData(data: Prisma.userUpdateInput, id: number): Promise<any>;
  destroyData(id: number): Promise<any>;
}

export default modelInterface;
