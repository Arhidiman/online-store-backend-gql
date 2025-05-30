import { DataTypes } from "sequelize";
export const Category = (sequelizeInstance) => {
    return sequelizeInstance.define('categories', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        }
    }, { tableName: 'categories', timestamps: false });
};
