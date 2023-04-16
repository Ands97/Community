import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import { ICourse, ICourseInstance } from "../interfaces/models/ICourse";

export const Course = sequelize.define<ICourseInstance, ICourse>('Course', {
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
    synopsis: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    thumbnailUrl: {
      type: DataTypes.STRING
    },
    featured: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'categories', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    }
  })