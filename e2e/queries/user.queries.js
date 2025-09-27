const { User } = require('../../src/db/users/models/index.js');

module.exports = async function getUser(email) {
  return User.findOne({
    where: {
      email,
    },
    raw: true,
  });
};
