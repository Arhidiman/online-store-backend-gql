import { DataTypes, Deferrable } from "sequelize"
import { sequelizeInstance } from "../../db/sequelizeInstance.ts"
import { Order } from "../OrdersModel/Order.ts"
import { Product } from "../ProductsModel/Product.ts"

export const OrderItems = sequelizeInstance.define('order_items', 
    
    {
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
    },

    {
        timestamps: false, 
        tableName: 'order_items'
    }
)