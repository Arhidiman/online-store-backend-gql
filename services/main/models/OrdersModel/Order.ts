import { DataTypes, Deferrable  } from "sequelize"
import { sequelizeInstance } from "../../db/sequelizeInstance"
import { User } from "../UserModel/User"


export const Order = sequelizeInstance.define('orders', 

    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE()
            }
        }
    },

    {
        timestamps: false,
        tableName: 'orders',
    }

)