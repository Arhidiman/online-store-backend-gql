import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../../db/sequelizeInstance.js";
export const Category = sequelizeInstance.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true
    },
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    }
}, { tableName: 'categories', timestamps: false });
