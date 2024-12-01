import { DataTypes } from "sequelize"
import { sequelizeInstance } from "../../db/sequelizeInstance.ts"


export const Category = sequelizeInstance.define('categories', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }

},   { tableName: 'categories', timestamps: false } )
