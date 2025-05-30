import { Sequelize } from "sequelize"
import { dbConfig } from "./config.ts"

const { database, user, password } = dbConfig

export const sequelizeInstance = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'postgres'
})

await sequelizeInstance.sync({ alter: true })

try {
    await sequelizeInstance.authenticate();
    console.log('Auth service connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  