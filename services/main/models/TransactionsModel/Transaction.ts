import { DataTypes, Deferrable, Sequelize } from "sequelize"
import { Order } from "../initModels.ts"

export const Transaction = (sequelize: Sequelize) =>
  sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true   
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE()
      }
    },
    full_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'transactions',
  })
