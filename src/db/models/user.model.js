const { DataTypes } = require('sequelize');
const sequelize = require('../connections/sequelize.js');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
    },
    jobArea: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    isBlock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
};

const User = sequelize.define(
    'user',
    UserSchema,
    {
        tableName: USER_TABLE,
        timestamps: false,
    },
);

module.exports = { User, UserSchema, USER_TABLE };
