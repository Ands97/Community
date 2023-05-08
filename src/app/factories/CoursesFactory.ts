import { ICoursesService } from "../interfaces/services/ICoursesService";
import { Course } from "../models";
import CoursesRepository from "../repositories/CoursesRepository";
import CoursesService from "../services/CourseService";


class CoursesFactory {
    public static getService(): ICoursesService {
        return new CoursesService(
            new CoursesRepository(Course)
        )
    }
}

export default CoursesFactory;