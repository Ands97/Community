import { Model, Optional } from "sequelize";

export interface ICategory {
    id: number,
    name: string,
    position: number
}

export interface ICategoryCreationAttributes extends Optional<ICategory, 'id'> {}

export interface ICategoryInstance extends Model<ICategory, ICategoryCreationAttributes>, ICategory{}