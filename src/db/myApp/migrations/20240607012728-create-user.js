const { UserSchema, USER_TABLE } = require('../models/User.model.js');
const { StudentSchema, STUDENT_TABLE } = require('../models/Student.model.js');
const { SubjectSchema, SUBJECT_TABLE } = require('../models/Subject.model.js');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(STUDENT_TABLE, StudentSchema);
    await queryInterface.createTable(SUBJECT_TABLE, SubjectSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(STUDENT_TABLE);
    await queryInterface.dropTable(SUBJECT_TABLE);
  },
};
