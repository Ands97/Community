import { ModelStatic } from "sequelize";
import { ICoursesRepository } from "../interfaces/repositories/ICoursesRepository";
import Result from "../../utils/Result";
import { ICourseInstance } from "../interfaces/models/ICourse";
import ErrorApplication from "../../shared/ErrorAplicattion";

class CoursesRepository implements ICoursesRepository {
    private readonly _model: ModelStatic<ICourseInstance>;

    constructor(model: ModelStatic<ICourseInstance>) {
        this._model = model
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