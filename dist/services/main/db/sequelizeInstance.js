import { dbConfig } from './config.js';
import { Sequelize } from 'sequelize';
const { database, user, password } = dbConfig;
export const sequelizeInstance = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'postgres',
});
