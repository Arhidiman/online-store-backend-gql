import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../../db/sequelizeInstance.js";
export const Product = sequelizeInstance.define('products', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    in_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
}, {
    tableName: 'products', timestamps: false
});
