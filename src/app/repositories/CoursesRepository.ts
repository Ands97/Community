import { ModelStatic, Op } from "sequelize";
import { ICoursesRepository } from "../interfaces/repositories/ICoursesRepository";
import Result from "../../utils/Result";
import { ICourseInstance } from "../interfaces/models/ICourse";
import ErrorApplication from "../../shared/ErrorAplicattion";

class CoursesRepository implements ICoursesRepository {
    private readonly _model: ModelStatic<ICourseInstance>;

    constructor(model: ModelStatic<ICourseInstance>) {
        this._model = model
    }

    public async getFeaturedCourses(): Promise<Result<ICourseInstance[]>> {
        try {
            const featuredCourses = await this._model.findAll({
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ],
                where: {
                    featured: true
                }
            });

            return Result.success(featuredCourses);
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CoursesRepository > getRandomFeaturedCourses',
                    error as string,
                    500
                )
            )
        }
    }

    public async getTopTenNewest(): Promise<Result<ICourseInstance[]>> {
        try {
            const courses = await this._model.findAll({
                limit: 10,
                order: [['created_at', 'DESC']]
            });

            return Result.success(courses);
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CoursesRepository > getTopTenNewest',
                    error as string,
                    500
                )
            )
        }
    }

    public async getCoursesByName(name: string, page: number, perPage: number): Promise<Result<{
        courses: ICourseInstance[],
        page: number,
        perPage: number,
        total: number
    }>> {
        try {
            const { count, rows } = await this._model.findAndCountAll({
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ],
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                limit: perPage,
                offset: (page - 1) * perPage
            })

            return Result.success({
                courses: rows,
                page,
                perPage,
                total: count
            })
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CoursesRepository > getCoursesByName',
                    error as string,
                    500
                )
            )
        }
    }

    public async getCourseByIdWithEpisodes(id: string): Promise<Result<ICourseInstance>> {
        try {
            const courseWithEpisodes = await this._model.findByPk(id, {
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ],
                include: {
                    association: 'Episodes',
                    attributes: [
                        'id',
                        'name',
                        'synopsis',
                        'order',
                        ['video_url', 'videoUrl'],
                        ['seconds_long', 'secondsLong']
                    ],
                    order: [['order', 'ASC']],
                    separate: true
                }
            });

            if (!courseWithEpisodes) {
                return Result.error(
                    new ErrorApplication(
                        'CoursesRepository > getCourseByIdWithEpisodes',
                        'COURSE_DOES_NOT_EXISTS',
                        400
                    )
                )
            }

            return Result.success(courseWithEpisodes)
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CoursesRepository > getCourseByIdWithEpisodes',
                    error as string,
                    500
                )
            )
        }
    }

}

export default CoursesRepository;