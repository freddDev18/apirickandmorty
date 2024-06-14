/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const { faker } = require('@faker-js/faker');

const userModelPath = '../models/example.js';

async function loadModel(modelPath) {
  const modelModule = await import(modelPath);
  return modelModule;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userModel = await loadModel(userModelPath);
    const users = [];
    for (let index = 0; index < 5; index += 1) {
      users.push({
        id: faker.string.uuid(),
        fullName: faker.person.fullName(),
        jobArea: faker.person.jobArea(),
        email: faker.internet.email(),
        isBlock: faker.datatype.boolean(),
      });
    }

    await queryInterface.bulkInsert(userModel.USER_TABLE, users, {});
  },

  async down(queryInterface, Sequelize) {
    const userModel = await loadModel(userModelPath);
    await queryInterface.bulkDelete(userModel.USER_TABLE, null, {});
  }
};
