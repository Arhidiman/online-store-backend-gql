import { DataTypes, Sequelize } from "sequelize"

export const User = (sequelize: Sequelize) =>
  sequelize.define('store_users', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
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
  }, {
    tableName: 'store_users',
    timestamps: false
  })
