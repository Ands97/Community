import ErrorApplication from "../../shared/ErrorAplicattion";
import Result from "../../utils/Result";
import { ICourse } from "../interfaces/models/ICourse";
import { ICoursesRepository } from "../interfaces/repositories/ICoursesRepository";
import { ICoursesService } from "../interfaces/services/ICoursesService";

class CoursesService implements ICoursesService {
    private readonly _repo: ICoursesRepository
    constructor(repo: ICoursesRepository) {
        this._repo = repo
    }

    public async getRandomFeaturedCourses(): Promise<Result<ICourse[]>> {
        try {
            const {
                success,
                response: featuredCourses,
                error
            } = await this._repo.getFeaturedCourses();

            if(!success){
                return Result.error(error);
            }

            const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random()).slice(0,3);

            return Result.success(randomFeaturedCourses)
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CoursesService > getRandomFeaturedCourses',
                    error as string,
                    500
                )
            )
        }
    }

    public async getTopTenNewest(): Promise<Result<ICourse[]>> {
        try {
            const {
                success,
                response: TopTenNewestCourses,
                error
            } = await this._repo.getTopTenNewest();

            if(!success){
                return Result.error(error)
            }

            return Result.success(TopTenNewestCourses);
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CoursesService > getTopTenNewest',
                    error as string,
                    500
                )
            )
        }
    }

    public async getCoursesByName(name: string, page: number, perPage: number): Promise<Result<{
        courses: ICourse[],
        page: number,
        perPage: number,
        total: number
    }>> {
            try {
                const {
                    success,
                    response: courses,
                    error
                } = await this._repo.getCoursesByName(name, page, perPage);

                if(!success){
                    return Result.error(error)
                }

                return Result.success(courses)
            } catch (error) {
                return Result.error(
                    new ErrorApplication(
                        'CoursesService > getCoursesByName',
                        error as string,
                        500
                    )
                )
            }
    }

    public async getCourseByIdWithEpisodes(id: string): Promise<Result<ICourse>> {
        try {
            const {
                success,
                response,
                error
            } = await this._repo.getCourseByIdWithEpisodes(id);

            if (!success) {
                return Result.error(error)
            }

            return Result.success(response)
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CoursesService > getCourseByIdWithEpisodes',
                    error as string,
                    500
                )
            )
        }
    }
}


export default CoursesService;