/* eslint-disable no-console */
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../../src/db/myApp/connections/sequelize.js');

const umzug = new Umzug({
  migrations: { glob: './src/db/myApp/seeders/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true, match: /_test$/ }); // Crear tablas
    await umzug.up();
  } catch (error) {
    console.error(error);
  }
};

const downSeed = async () => {
  await sequelize.drop();
};

module.exports = { upSeed, downSeed };
