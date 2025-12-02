const { Timezone } = require('../models/index.js');

async function insert(data) {
  const insertTimezone = await Timezone.bulkCreate(data, {
    returning: true,
  });
  return insertTimezone;
}

module.exports = {
  insert,
};
