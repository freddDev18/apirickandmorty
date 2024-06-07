import { DataTypes } from 'sequelize';
import sequelize from '../connections/sequelize.js';

const USER_TABLE = 't_usuarios';

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
        defaultValue: false
    }
};

const User = sequelize.define(
    'Users', UserSchema,
    {
        tableName: USER_TABLE,
        timestamps: false,
    },
);

export { User, UserSchema, USER_TABLE };