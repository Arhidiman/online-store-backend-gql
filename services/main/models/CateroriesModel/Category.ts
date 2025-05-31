import { DataTypes, Sequelize } from "sequelize"

export const Category = (sequelizeInstance: Sequelize) => {
  return sequelizeInstance.define('categories', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'categories',
    timestamps: false
  })
}
