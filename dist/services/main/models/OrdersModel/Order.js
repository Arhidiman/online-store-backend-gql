import { DataTypes, Deferrable } from "sequelize";
import { User } from "../initModels.js";
export const Order = (sequelize) => sequelize.define('orders', {
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
});
