import { Response } from "express";
import Result from "../../../utils/Result";
import { TStream } from "../../types/TStream";

export interface IEpisodesService{
    processStreamVideo(res: Response, videoUrl: string, range: string | undefined): void
}