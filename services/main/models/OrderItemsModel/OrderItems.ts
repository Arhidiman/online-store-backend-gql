import { DataTypes, Deferrable } from "sequelize"
import { sequelizeInstance } from "../../db/sequelizeInstance"
import { Order } from "../OrdersModel/Order"
import { Product } from "../ProductsModel/Product"

export const OrderItems = sequelizeInstance.define('order_items', 
    
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
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
        }
    },

    {
        timestamps: false, 
        tableName: 'order_items'
    }
)