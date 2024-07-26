const { User } = require('./user.model.js');
const { Student } = require('./student.model.js');
const { Subject } = require('./subject.model.js');

User.hasOne(Student);
Student.belongsTo(User);
Student.belongsToMany(Subject, { through: 'StudentsSubjects' });
Subject.belongsToMany(Student, { through: 'StudentsSubjects' });

module.exports = { User, Student, Subject };
