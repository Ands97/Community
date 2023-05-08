import Result from "../../../utils/Result";
import { ICategory, ICategoryInstance } from "../models/ICategory";

export interface ICategoriesRepository{
    getCategories(limit: number, offset: number): Promise<Result<{categories: ICategory[], total: number}>>
    getCourseByCategory(id: string): Promise<Result<ICategoryInstance>>;

}