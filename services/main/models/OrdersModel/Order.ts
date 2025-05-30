import { DataTypes, Deferrable, Sequelize } from "sequelize"
import { User } from "../initModels.ts"

export const Order = (sequelize: Sequelize) =>
  sequelize.define('orders', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      
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
