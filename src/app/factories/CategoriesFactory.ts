import { ICategoriesService } from "../interfaces/services/ICategoriesService";
import { Category } from "../models";
import CategoriesRepository from "../repositories/CategoriesRepository";
import CategoriesService from "../services/CategoriesService";

class CategoriesFactory {
    public static getService(): ICategoriesService {
        return new CategoriesService(
            new CategoriesRepository(Category)
        )
    }
}

export default CategoriesFactory;