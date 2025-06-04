import { DataTypes } from "sequelize";
export const User = (sequelize) => sequelize.define('store_users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    jwt_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'store_users',
    timestamps: false
});
