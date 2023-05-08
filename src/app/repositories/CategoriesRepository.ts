import { ModelStatic } from "sequelize";
import { ICategory, ICategoryInstance } from "../interfaces/models/ICategory";
import { ICategoriesRepository } from "../interfaces/repositories/ICategoriesRepository";
import Result from "../../utils/Result";
import ErrorApplication from "../../shared/ErrorAplicattion";

class CategoriesRepository implements ICategoriesRepository {
    private readonly _model: ModelStatic<ICategoryInstance>;

    constructor(model: ModelStatic<ICategoryInstance>) {
        this._model = model
    }

    public async getCategories(limit: number, offset: number): Promise<Result<{ categories: ICategory[], total: number }>> {
        try {
            const { count, rows } = await this._model.findAndCountAll({
                order: [['position', 'ASC']],
                limit,
                offset
            });

            if (!rows) {
                return Result.error(
                    new ErrorApplication(
                        'CategoriesRepository > getCategories',
                        'CATEGORIES_DOES_NOT_EXIST',
                        400,
                    )
                )
            }

            return Result.success({ categories: rows, total: count })
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CategoriesRepository > getCategories',
                    error as string,
                    500
                )
            )
        }
    }

    public async getCourseByCategory(id: string): Promise<Result<ICategoryInstance>> {
        try {
            const categoryWithCourses = await this._model.findByPk(id, {
                attributes: ['id', 'name'],
                include: {
                    association: 'Courses',
                    attributes: [
                        'id',
                        'name',
                        'synopsis',
                        ['thumbnail_url', 'thumbnailUrl']
                    ]
                }
            });

            if (!categoryWithCourses) {
                return Result.error(
                    new ErrorApplication(
                        'CategoriesRepository > getCourseByCategory',
                        'CATEGORIES_DOES_NOT_EXIST',
                        400
                    )
                )
            }

            return Result.success(categoryWithCourses)
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CategoriesRepository > getCourseByCategory',
                    error as string,
                    500
                )
            )
        }
    }
}

export default CategoriesRepository;