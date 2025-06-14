import { dbConfig } from './config.js'
import { Sequelize, Model, DataTypes } from 'sequelize';

const { database, user, password} = dbConfig

export const sequelizeInstance = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'postgres',
})
  