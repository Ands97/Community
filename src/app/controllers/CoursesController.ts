import { Request, Response } from "express";
import Logger from "../../utils/Logger";
import CoursesFactory from "../factories/CoursesFactory";

class CoursesController {
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