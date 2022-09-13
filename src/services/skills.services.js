const { dataSource } = require("../utils");
const Skills = require("../models/skills.models");

module.exports = {
    getMany: async() => {
        return await dataSource.getRepository(Skills).find()
    },
    getOneById: async(id) => {
        return await dataSource.getRepository(Skills).findOneBy(id);
    },
    create: async(wilder) => {
        return await dataSource.getRepository(Skills).save(wilder);
    },
    update: async(id, newWilderData) => {
        const oldwilder = await dataSource.getRepository(Skills).findOneBy(id);
        await dataSource.getRepository(Skills).merge(oldwilder, newWilderData);
        return await dataSource.getRepository(Skills).save(oldwilder);
    },
    delete: async(id) => {
        return await dataSource.getRepository(Skills).delete(id);
    }
}