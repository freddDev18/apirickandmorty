const { DataTypes } = require('sequelize');
const sequelize = require('../connections/sequelize.js');

const STUDENT_TABLE = 'students';

const StudentSchema = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
};

const Student = sequelize.define(
    'student',
    StudentSchema,
    {
        tableName: STUDENT_TABLE,
        timestamps: false,
    },
);

module.exports = { Student, StudentSchema, STUDENT_TABLE };
