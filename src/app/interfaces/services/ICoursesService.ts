import Result from "../../../utils/Result";
import { ICourse } from "../models/ICourse";

export interface ICoursesService {
    getRandomFeaturedCourses(): Promise<Result<ICourse[]>>;
    getTopTenNewest(): Promise<Result<ICourse[]>>;
    getCoursesByName(name: string, page: number, perPage: number): Promise<Result<{
        courses: ICourse[],
        page: number,
        perPage: number,
        total: number
    }>>;
    getCourseByIdWithEpisodes(id: string): Promise<Result<ICourse>>;
}