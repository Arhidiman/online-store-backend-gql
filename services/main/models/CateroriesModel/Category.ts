import { DataTypes, Sequelize } from "sequelize"

export const Category = (sequelizeInstance: Sequelize) => {
    return sequelizeInstance.define('categories', {

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
    
    },   { tableName: 'categories', timestamps: false } )
}
