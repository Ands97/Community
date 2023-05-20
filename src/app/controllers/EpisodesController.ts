import { Request, Response } from "express";
import path from "path";
import fs from 'fs'
import Logger from "../../utils/Logger";
import EpisodesFactory from "../factories/EpisodesFactory";

class EpisodesController {
    public async stream(req: Request, res: Response){
        try {
            const { videoUrl } = req.query;

            if (typeof videoUrl !== 'string') throw new Error('VideoUrl param must be of type string');

            const range = req.headers.range;

            const service = EpisodesFactory.getService()
            
            service.processStreamVideo(res, videoUrl, range)
            
        } catch (error) {
            Logger.error('CoursesController > stream', error)
            res.status(500).json(error)
        }
    }
}

export default new EpisodesController();