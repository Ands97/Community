import { Request, Response } from "express";
import CategoriesFactory from "../factories/CategoriesFactory";
import Logger from "../../utils/Logger";
import { Helpers } from "../../utils/helpers/Helpers";

class CategoriesController {
    public async index(req: Request, res: Response): Promise<void> {
        const [ page, perPage ] = Helpers.getPaginationParams(req.query);


        const offset = (page - 1) * perPage;

        try {
            const service = CategoriesFactory.getService();

            const {
                success: existsCategories,
                response: categories,
                error
            } = await service.getCategories(perPage, offset);
            
            if (!existsCategories) {
                throw error
            }

            res.json({
                categories: categories.categories,
                page: page,
                perPage,
                total: categories.total
            })

        } catch (error: any) {
            Logger.error('CategoriesController > index', error)
            res.status(error.code).json(error)
        }
    }

    public async show(req: Request, res: Response): Promise<void>{
        try {
            const { id } = req.params;

            const service = CategoriesFactory.getService();

            const {
                success,
                response: category,
                error
            } = await service.getCourseByCategory(id);
            
            if(!success){
                throw error
            }

            res.json(category)
        } catch (error: any) {
            Logger.error('CategoriesController > show', error)
            res.status(error.code).json(error)
        }
    }
}

export default new CategoriesController();