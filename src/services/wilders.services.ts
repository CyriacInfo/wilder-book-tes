import dataSource from "../utils";
import { Wilder } from "../models/wilder.models";
import { Skills } from "../models/skills.models";
import { DeleteResult, Repository } from "typeorm";
import { Wilder_Skills } from "../models/wilder_skills.models";

const wilderRepository: Repository<Wilder> = dataSource.getRepository(Wilder);

const wilderServices = {
  getMany: async (): Promise<Wilder[]> => {
    return await wilderRepository.find();
  },
  getOneById: async (id: number): Promise<Wilder | null> => {
    return await wilderRepository.findOneBy({ id: id });
  },
  create: async (wilder: {
    name: string;
    description: string;
  }): Promise<Wilder> => {
    return await wilderRepository.save(wilder);
  },
  update: async (id: number, newWilderData: object): Promise<any> => {
    const oldwilder: Wilder | null = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: id });
    if (oldwilder) {
      wilderRepository.update(id, newWilderData);
      return await wilderRepository.save(oldwilder);
    }
    return oldwilder;
  },
  delete: async (id: number): Promise<DeleteResult> => {
    return await wilderRepository.delete(id);
  },
  addSkill: async (id: number, skillId: number): Promise<void> => {
    const wilderToUpdate: Wilder | null = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: id });

    const skillToAdd: Skills | null = await dataSource
      .getRepository(Skills)
      .findOneBy({ id: skillId });

    if (wilderToUpdate === null || skillToAdd === null) {
      throw new Error("Wilder or skill not found");
    }
    await dataSource
      .getRepository(Wilder_Skills)
      .save({ wilderId: id, skill: skillId });
  },
  removeSkill: async (id: number, skillId: number): Promise<any> => {
    const wilderToUpdate: Wilder | null = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: id });

    const skillToRemove: Skills | null = await dataSource
      .getRepository(Skills)
      .findOneBy({ id: skillId });

    if (wilderToUpdate && skillToRemove) {
      wilderToUpdate.skills = wilderToUpdate.skills.filter(
        (skill: Wilder_Skills): boolean => skill.id !== skillToRemove.id
      );
      return await wilderRepository.save(wilderToUpdate);
    }
    return wilderToUpdate;
  },
  deleteAllSkills: async (id: number): Promise<Wilder | null> => {
    const wilderToUpdate: Wilder | null = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: id });
    if (wilderToUpdate) {
      wilderToUpdate.skills = [];
      return await wilderRepository.save(wilderToUpdate);
    }
    return null;
  },
};

export default wilderServices;
