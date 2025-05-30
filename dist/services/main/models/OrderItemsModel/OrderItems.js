import { DataTypes, Deferrable } from "sequelize";
import { Product, Order } from "../initModels.js";
export const OrderItems = (sequelize) => sequelize.define('order_items', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
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
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE()
        }
    },
    product_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'order_items'
});
