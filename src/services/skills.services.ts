import dataSource from "../utils";
import { Skills } from "../models/skills.models";
import { Repository } from "typeorm";

const skillRepository: Repository<Skills> = dataSource.getRepository(Skills);

const skillsService = {
  getMany: async (): Promise<Skills[]> => {
    return await skillRepository.find();
  },
  getOneById: async (id: number): Promise<Skills | null> => {
    return await skillRepository.findOneBy({ id: id });
  },
  create: async (wilder: any): Promise<Skills> => {
    return await skillRepository.save(wilder);
  },
  update: async (id: number, newSkillData: Skills): Promise<Skills | null> => {
    const oldwilder: Skills | null = await dataSource
      .getRepository(Skills)
      .findOneBy({ id: id });
    if (oldwilder) {
      skillRepository.merge(oldwilder, newSkillData);
      return await skillRepository.save(oldwilder);
    }
    return oldwilder;
  },
  delete: async (id: number): Promise<any> => {
    return await skillRepository.delete(id);
  },
};

export default skillsService;
