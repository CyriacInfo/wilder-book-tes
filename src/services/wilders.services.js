const { dataSource } = require("../utils");
const Wilder = require("../models/wilder.models");
const Skills = require("../models/skills.models");

module.exports = {
  getMany: async () => {
    return await dataSource.getRepository(Wilder).find();
  },
  getOneById: async (id) => {
    return await dataSource.getRepository(Wilder).findOneBy(id);
  },
  create: async (wilder) => {
    return await dataSource.getRepository(Wilder).save(wilder);
  },
  update: async (id, newWilderData) => {
    const oldwilder = await dataSource.getRepository(Wilder).findOneBy(id);
    await dataSource.getRepository(Wilder).merge(oldwilder, newWilderData);
    return await dataSource.getRepository(Wilder).save(oldwilder);
  },
  delete: async (id) => {
    return await dataSource.getRepository(Wilder).delete(id);
  },
  addSkill: async (id, skillId) => {
    const wilderToUpdate = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: id });

    const skillToAdd = await dataSource
      .getRepository(Skills)
      .findOneBy({ id: skillId });
    wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
    await dataSource.getRepository(Wilder).save(wilderToUpdate);
  },
  removeSkill: async (id, skillId) => {
    const wilderToUpdate = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: id });

    const skillToRemove = await dataSource.getRepository(Skills).findOneBy({id: skillId});
    wilderToUpdate.skills = wilderToUpdate.skills.filter((skill) => skill.id !== skillToRemove.id);

    await dataSource.getRepository(Wilder).save(wilderToUpdate);
  },
};
