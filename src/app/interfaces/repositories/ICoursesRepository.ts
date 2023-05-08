import Result from "../../../utils/Result";
import { ICourseInstance } from "../models/ICourse";

export interface ICoursesRepository{
    getCourseByIdWithEpisodes(id: string): Promise<Result<ICourseInstance>>

}