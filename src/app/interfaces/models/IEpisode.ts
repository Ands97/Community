import { Model, Optional } from "sequelize"

export interface IEpisode {
  id: number
  name: string
  synopsis: string
  order: number
  videoUrl: string
  secondsLong: number
  courseId: number
}

export interface IEpisodeCreationAttributes
  extends Optional<IEpisode, 'id' | 'videoUrl' | 'secondsLong' > {}

export interface IEpisodeInstance
  extends Model<IEpisode, IEpisodeCreationAttributes>, IEpisode {}