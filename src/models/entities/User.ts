import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    length: 50,
    type: "varchar",
  })
  username: string;

  @Column({
    length: 255,
    type: "varchar",
  })
  password: string;

  @Column({
    length: 150,
    type: "varchar",
  })
  user_email: string;

  @Column({
    length: 150,
    type: "varchar",
  })
  user_nama: string;

  @Column({
    length: 255,
    nullable: true,
    type: "varchar",
  })
  user_img: string | null;

  @Column({
    nullable: true,
    type: "datetime",
  })
  created_at: Date | null;

  @Column({
    nullable: true,
    type: "datetime",
  })
  updated_at: Date | null;
}
