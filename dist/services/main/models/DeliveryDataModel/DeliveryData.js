import { DataTypes, Deferrable } from "sequelize";
import { Transaction } from "../initModels.js";
export const DeliveryData = (sequelize) => sequelize.define('delivery_data', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
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
