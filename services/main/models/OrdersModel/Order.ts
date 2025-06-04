import { DataTypes, Deferrable, Sequelize } from "sequelize"
import { User } from "../initModels.js"

export const Order = (sequelize: Sequelize) =>
  sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true  
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE()
      }
    },
    is_current: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'orders',
  })
