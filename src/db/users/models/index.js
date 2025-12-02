const { User } = require('./User.model.js');
const { Student } = require('./Student.model.js');
const { Subject } = require('./Subject.model.js');
const { Timezone } = require('./TimeZone.model.js');

User.hasOne(Student);
Student.belongsTo(User);
Student.belongsToMany(Subject, { through: 'StudentsSubjects' });
Subject.belongsToMany(Student, { through: 'StudentsSubjects' });

module.exports = {
  User, Student, Subject, Timezone,
};
