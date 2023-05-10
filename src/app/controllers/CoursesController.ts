import { Request, Response } from "express";
import Logger from "../../utils/Logger";
import CoursesFactory from "../factories/CoursesFactory";
import { Helpers } from "../../utils/helpers/Helpers";

class CoursesController {
    public async getFatured(req: Request, res: Response){
        try {
            const service = CoursesFactory.getService();

            const {
                success,
                response,
                error
            } = await service.getRandomFeaturedCourses();

            if(!success){
                throw error;
            }

            res.json(response)
        } catch (error: any) {
            Logger.error('CoursesController > getFatured', error)
            res.status(error.code).json(error)
        }
    }

    public async getNewest(req: Request, res: Response){
        try {
            const service = CoursesFactory.getService();

            const {
                success,
                response,
                error
            } = await service.getTopTenNewest();

            if(!success){
                throw error;
            }

            res.json(response)
        } catch (error: any) {
            Logger.error('CoursesController > getNewest', error)
            res.status(error.code).json(error)
        }
    }

    public async search(req: Request, res: Response){
        const { name } = req.query;

        const [ page, perPage ] = Helpers.getPaginationParams(req.query);

        try {
            if (typeof name !== 'string') throw new Error('Name param must be of type string');

            const service = CoursesFactory.getService();

            const {
                success,
                response,
                error
            } = await service.getCoursesByName(name, page, perPage);

            if(!success){
                throw error;
            }

            res.json(response)
        } catch (error: any) {
            Logger.error('CoursesController > search', error)
            res.status(error.code).json(error)
        }
    }
    
    public async show(req: Request, res: Response): Promise<void>{
        try {
         const { id } = req.params;

            const service = CoursesFactory.getService();

            const {
                success,
                response: course,
                error
            } = await service.getCourseByIdWithEpisodes(id);


            if(!success){
                throw error;
            }

            res.json(course)
        } catch (error: any) {
            Logger.error('CoursesController > show', error)
            res.status(error.code).json(error)
        }
    }
}

export default new CoursesController();