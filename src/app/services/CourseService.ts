import ErrorApplication from "../../shared/ErrorAplicattion";
import Result from "../../utils/Result";
import { ICourse } from "../interfaces/models/ICourse";
import { ICoursesRepository } from "../interfaces/repositories/ICoursesRepository";
import { ICoursesService } from "../interfaces/services/ICoursesService";

class CoursesService implements ICoursesService {
    private readonly _repo: ICoursesRepository
    constructor(repo: ICoursesRepository) {
        this._repo = repo
    }

   public async getCourseByIdWithEpisodes(id: string): Promise<Result<ICourse>> {
       try {
            const {
                success,
                response,
                error
            } = await this._repo.getCourseByIdWithEpisodes(id);

            if(!success){
                return Result.error(error)
            }

            return Result.success(response)
       } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'CoursesService > getCourseByIdWithEpisodes',
                    error as string,
                    500
                )
            )
       }
   }
}


export default CoursesService;