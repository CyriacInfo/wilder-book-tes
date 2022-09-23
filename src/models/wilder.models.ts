import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Wilder_Skills } from "./wilder_skills.models";

@Entity()
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Wilder_Skills, (ws) => ws.wilderId, {
    eager: true,
  })
  skills: Wilder_Skills[];
}
