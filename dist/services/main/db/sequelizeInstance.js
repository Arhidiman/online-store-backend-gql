import { dbConfig } from './config.js';
import { Sequelize } from 'sequelize';
const { database, user, password } = dbConfig;
export const sequelizeInstance = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'postgres',
    // logging: (...msg) => console.log(msg)
});
await sequelizeInstance.sync();
console.log('sequilize successfully syncronized !');
try {
    await sequelizeInstance.authenticate();
    console.log('Main service connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
