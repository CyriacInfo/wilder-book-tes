import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
