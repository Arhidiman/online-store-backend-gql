import { DataTypes, Deferrable } from "sequelize";
import { sequelizeInstance } from "../../db/sequelizeInstance.js";
import { Order } from "../OrdersModel/Order.js";
export const Transaction = sequelizeInstance.define('transactions', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.UUID,
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
        type: DataTypes.TIME
    }
}, {
    timestamps: false,
    tableName: 'transactions',
});
