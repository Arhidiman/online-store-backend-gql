import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../../db/sequelizeInstance.ts";

export const User = sequelizeInstance.define('store_users',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        user_role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jwt_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },        

    },
    {
        tableName: 'store_users', timestamps: false
    }
)