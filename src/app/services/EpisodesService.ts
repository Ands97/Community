import Result from "../../utils/Result";
import { IEpisodesRepository } from "../interfaces/repositories/IEpisodesRepository";
import { IEpisodesService } from "../interfaces/services/IEpisodesService";
import fs from 'fs';
import { TStream } from "../types/TStream";
import ErrorApplication from "../../shared/ErrorAplicattion";
import path from "path";
import { Response } from "express";
import Logger from "../../utils/Logger";

class EpisodesService implements IEpisodesService{
    private readonly _repo: IEpisodesRepository;

    constructor(repo: IEpisodesRepository){
        this._repo = repo
    }

    public processStreamVideo(res: Response, videoUrl: string, range: string | undefined): void{
        try {
            
            const filePath = path.join(__dirname, '..', '..', '..', 'uploads', videoUrl)
            const fileStat = fs.statSync(filePath);

            if(!range){
                const head = {
                    'Content-Length': fileStat.size,
                    'Content-Type': 'video/mp4'
                }

                res.writeHead(200, head)

                fs.createReadStream(filePath).pipe(res)
                return;
            }

            const parts = range.replace(/bytes=/, '').split('-');

            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1

            const chunkSize = (end - start) + 1

            const file = fs.createReadStream(filePath, { start, end })

            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            }

            res.writeHead(206, head)

            file.pipe(res)

        } catch (error) {
            Logger.error('CoursesController > stream', error)
        }
    }
}

export default EpisodesService;