import Result from "../../../utils/Result";
import { ICategory } from "../models/ICategory";

export interface ICategoriesService{
    getCategories(limit: number, offset: number): Promise<Result<{categories: ICategory[], total: number}>>;
    getCourseByCategory(id: string): Promise<Result<ICategory>>;
}