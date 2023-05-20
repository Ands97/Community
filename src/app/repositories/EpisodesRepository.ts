import { ModelStatic } from "sequelize";
import { IEpisodeInstance } from "../interfaces/models/IEpisode";
import { IEpisodesRepository } from "../interfaces/repositories/IEpisodesRepository";

class EpisodesRepository implements IEpisodesRepository{
    private readonly _model: ModelStatic<IEpisodeInstance>

    constructor(model: ModelStatic<IEpisodeInstance>){
        this._model = model
    }
}

export default EpisodesRepository;