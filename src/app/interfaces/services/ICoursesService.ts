import Result from "../../../utils/Result";
import { ICourse } from "../models/ICourse";

export interface ICoursesService{
    getCourseByIdWithEpisodes(id: string): Promise<Result<ICourse>>
}