import { DataTypes, Deferrable } from "sequelize";
import { sequelizeInstance } from "../../db/sequelizeInstance.js";
import { Transaction } from "../TransactionsModel/Transaction.js";
export const DeliveryData = sequelizeInstance.define('order_items', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    building: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transaction_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Transaction,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE()
        }
    },
}, {
    timestamps: false,
    tableName: 'delivery_data'
});
