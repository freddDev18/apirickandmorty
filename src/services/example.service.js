// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import boom from '@hapi/boom';

class UsersService {
    constructor(){
      this.users = [];
      this.init();
    }
  
    init(){
      const limit = 5;
      for (let index = 0; index < limit; index+=1) {
        this.users.push({
          id: faker.string.uuid(),
          fullName: faker.person.fullName(),
          jobArea: faker.person.jobArea(),
          email: faker.internet.email(),
          isBlock: faker.datatype.boolean(),
        });
      }
    }
  
    async create(data){
      const newUser = {
        id: faker.string.uuid(),
        ...data
      }
      this.users.push(newUser);
      return newUser;
    }
  
    async find(){
      return this.users;
    }
  
    async findOne(id){
      const user = this.users.find(item => item.id === id);
      if(!user){
        throw boom.notFound('User not found');
      }
      if(user.isBlock){
        throw boom.conflict('User is blocked');
      }
      return user;
    }
  
    async update(id, changes){
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1){
        throw boom.notFound('User not found');
      }
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...changes
      };
      return this.users[index];
    }
  
    async delete(id){
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1){
        throw boom.notFound('User not found');
      }
      this.users.splice(index,1);
      return { id }
    }
  }
  
  export default UsersService;
  