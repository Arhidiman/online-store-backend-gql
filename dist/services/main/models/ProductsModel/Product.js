import { DataTypes } from "sequelize";
export const Product = (sequelizeInstance) => {
    return sequelizeInstance.define('products', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        discount: {
            type: DataTypes.DOUBLE,
        },
        in_stock: {
            type: DataTypes.INTEGER,
        },
        rating: {
            type: DataTypes.DOUBLE,
        },
    }, {
        tableName: 'products', timestamps: false
    });
};
