import Result from "../../../utils/Result";
import { ICourseInstance } from "../models/ICourse";

export interface ICoursesRepository {
    getFeaturedCourses(): Promise<Result<ICourseInstance[]>>;
    getTopTenNewest(): Promise<Result<ICourseInstance[]>>;
    getCoursesByName(name: string, page: number, perPage: number): Promise<Result<{
        courses: ICourseInstance[],
        page: number,
        perPage: number,
        total: number
    }>>;
    getCourseByIdWithEpisodes(id: string): Promise<Result<ICourseInstance>>;
}