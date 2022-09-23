import { DataSource } from "typeorm";
import { Wilder } from "./models/wilder.models";
import { Skills } from "./models/skills.models";
import { Wilder_Skills } from "./models/wilder_skills.models";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skills, Wilder_Skills],
  // logging: ["query", "error"],
});

export default dataSource;
