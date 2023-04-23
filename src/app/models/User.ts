import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import { IUser, IUserInstance } from "../interfaces/models/IUser";
import bcrypt from 'bcrypt'

export const User = sequelize.define<IUserInstance, IUser>('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [['admin', 'user']]
      }
    },
  }, {
    hooks: {
        beforeSave: async (user) => {
            if(user.isNewRecord || user.changed('password')){
                user.password = await bcrypt.hash(user.password.toString(), 10)
            }
        }
    }
  })