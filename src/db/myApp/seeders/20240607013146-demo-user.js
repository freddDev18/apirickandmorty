/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const { faker } = require('@faker-js/faker');
const { USER_TABLE } = require('../models/User.model.js');

module.exports = {
  async up(queryInterface, Sequelize) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
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

    await queryInterface.bulkInsert(USER_TABLE, users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
