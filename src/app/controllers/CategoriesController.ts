import { Request, Response } from "express";
import CategoriesFactory from "../factories/CategoriesFactory";
import Logger from "../../utils/Logger";

class CategoriesController {
    public async index(req: Request, res: Response): Promise<void> {
        const { page, limit } = req.query;

        const limitNumber = typeof limit === 'string' && parseInt(limit, 10) > 0
            ? parseInt(limit, 10)
            : 10

        const pageNumber = typeof page === 'string' && parseInt(page, 10) > 0
            ? parseInt(page, 10)
            : 1

        const offset = (pageNumber - 1) * limitNumber;

        try {
            const service = CategoriesFactory.getService();

            const {
                success: existsCategories,
                response: categories,
                error
            } = await service.getCategories(limitNumber, offset);
            
            if (!existsCategories) {
                throw error
            }

            res.json({
                categories: categories.categories,
                page: pageNumber,
                limit,
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