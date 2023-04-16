import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import { ICategory, ICategoryInstance } from "../interfaces/models/ICategory";

export const Category = sequelize.define<ICategoryInstance, ICategory>('Category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      position: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
})