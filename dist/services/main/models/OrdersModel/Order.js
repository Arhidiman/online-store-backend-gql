import { DataTypes, Deferrable } from "sequelize";
import { sequelizeInstance } from "../../db/sequelizeInstance.js";
import { User } from "../UserModel/User.js";
export const Order = sequelizeInstance.define('orders', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
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
