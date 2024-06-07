/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import boom from '@hapi/boom';
import { User } from '../db/models/example.js';

class UsersService {

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    const data = await User.findAll();
    return data;
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    if (user.isBlock) {
      throw boom.conflict('User is blocked');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return { id }
  }
}

export default UsersService;
