import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Wilder } from "./wilder.models";
import { Skills } from "./skills.models";

@Entity()
export class Wilder_Skills {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, default: 0 })
  votes: number;

  @ManyToOne(() => Wilder, { onDelete: "CASCADE" })
  @JoinColumn({ name: "wilderId" })
  wilderId: Wilder["id"];

  @ManyToOne(() => Skills, { eager: true })
  @JoinColumn({ name: "skillId" })
  skill: Skills["id"];
}
