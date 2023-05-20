import { IEpisodesService } from "../interfaces/services/IEpisodesService";
import { Episode } from "../models";
import EpisodesRepository from "../repositories/EpisodesRepository";
import EpisodesService from "../services/EpisodesService";


class EpisodesFactory {
    public static getService(): IEpisodesService {
        return new EpisodesService(
            new EpisodesRepository(Episode)
        )
    }
}

export default EpisodesFactory;