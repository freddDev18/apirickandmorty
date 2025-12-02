const { Timezone } = require('../../src/db/users/models/index.js');

module.exports = async function getDate() {
  const date = await Timezone.findAll({
    attributes: [
      'id',
      'timeZone',
      [Timezone.sequelize.fn('DATE_FORMAT', Timezone.sequelize.col('date'), '%Y-%m-%d %H:%i:%s'), 'date'],
    ],
    raw: true,
  });
  return date;
};
