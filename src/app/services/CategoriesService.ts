import ErrorApplication from "../../shared/ErrorAplicattion";
import Result from "../../utils/Result";
import { ICategory } from "../interfaces/models/ICategory";
import { ICategoriesRepository } from "../interfaces/repositories/ICategoriesRepository";
import { ICategoriesService } from "../interfaces/services/ICategoriesService";

class CategoriesService implements ICategoriesService {
    private readonly _repo: ICategoriesRepository
    constructor(repo: ICategoriesRepository) {
        this._repo = repo
    }

    public async getCategories(limit: number, offset: number): Promise<Result<{categories: ICategory[], total: number}>> {
        try {
            const {
                success: existsCategories,
                response: categories,
                error
            } = await this._repo.getCategories(limit, offset);

            if (!existsCategories) {
                return Result.error(error)
            }

            return Result.success(categories)
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CategoriesService > getGatecories',
                    error as string,
                    500
                )
            )
        }
    }

    public async getCourseByCategory(id: string): Promise<Result<ICategory>> {
        try {
            const {
                success,
                response,
                error
            } = await this._repo.getCourseByCategory(id);

            if(!success){
                return Result.error(error);
            }

            return Result.success(response);
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CategoriesService > getCourseByCategory',
                    error as string,
                    500
                )
            )
        }
    }
}


export default CategoriesService;