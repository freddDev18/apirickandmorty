/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { User } = require('../db/models/example.js');

class UsersService {

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    User.create(newUser);
    return newUser;
  }

  async find() {
    const data = await User.findAll(
      // Only for Test Schema Validator in APIM
      // { attributes: ['id', ['fullName', 'nombreCompleto'], 'email'] }
    );
    return { data };
  }

  async findOne(id) {
    const user = await User.findOne({
      where: {
        id
      }
    })
    if (!user) {
      throw boom.notFound('User not found');
    }
    if (user.isBlock) {
      throw boom.conflict('User is blocked');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    await user.destroy();
    return { id }
  }
}

module.exports = UsersService;
