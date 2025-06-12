const { DataTypes } = require('sequelize');
const sequelize = require('../connections/sequelize.js');

const SUBJECT_TABLE = 'subjects';

const SubjectSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  level: {
    type: DataTypes.STRING,
  },
};

const Subject = sequelize.define(
  'subject',
  SubjectSchema,
  {
    tableName: SUBJECT_TABLE,
    timestamps: false,
  },
);

module.exports = { Subject, SubjectSchema, SUBJECT_TABLE };
