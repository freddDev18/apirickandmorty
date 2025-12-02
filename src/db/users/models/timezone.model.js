const { DataTypes } = require('sequelize');
const sequelize = require('../connections/sequelize.js');

const TIMEZONE_TABLE = 'timezones';

const TimezoneSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  timeZone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

const Timezone = sequelize.define(
  'timezone',
  TimezoneSchema,
  {
    tableName: TIMEZONE_TABLE,
    timestamps: false,
  },
);

module.exports = { Timezone, TimezoneSchema, TIMEZONE_TABLE };
