import { Model, Optional } from "sequelize"

export interface IUser {
    id: number
    firstName: string
    lastName: string
    phone: string
    birth: Date
    email: string
    password: string
    role: 'admin' | 'user'
  }
  
  export interface IUserCreationAttributes
    extends Optional<IUser, 'id'> {}
  
  export interface IUserInstance
    extends Model<IUser, IUserCreationAttributes>, IUser {}