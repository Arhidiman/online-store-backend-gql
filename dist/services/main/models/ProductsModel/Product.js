import { DataTypes } from "sequelize";
export const Product = (sequelizeInstance) => {
    const ProductModel = sequelizeInstance.define('products', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories', // имя таблицы
                key: 'id'
            }
        }
    }, {
        tableName: 'products',
        timestamps: false
    });
    return ProductModel;
};
