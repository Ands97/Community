import { Model, Optional } from "sequelize"

export interface ICourse {
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
    featured: boolean
    categoryId: number
  }
  
  export interface ICourseCreationAttributes extends Optional<ICourse, 'id' | 'thumbnailUrl' | 'featured' > {}
  
  export interface ICourseInstance extends Model<ICourse, ICourseCreationAttributes>, ICourse {}
  
  