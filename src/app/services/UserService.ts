import ErrorApplication from "../../shared/ErrorAplicattion";
import Result from "../../utils/Result";
import { IUser, IUserCreationAttributes } from "../interfaces/models/IUser";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IUserService } from "../interfaces/services/IUserService";

class UserService implements IUserService{
    private readonly _repo: IUserRepository;

    constructor(repo: IUserRepository){
        this._repo = repo
    }

    public async createUser(user: IUserCreationAttributes): Promise<Result<IUser>> {
        try {
            const {
                success: userExists,   
            } = await this._repo.findByEmail(user.email);

            if (userExists){
                return Result.error(
                    new ErrorApplication(
                        'UserRepository > findByEmail',
                        'USER_ALREADY_EXISTS',
                        400,
                    )
                )
            }

            const {
                success,
                response: newUser,
                error
            } = await this._repo.create(user);

            if(!success){
                return Result.error(error)
            }

            return Result.success(newUser)
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'UserService > findByEmail',
                    error as string,
                    500
                )
            )
        }
    }
}

export default UserService;