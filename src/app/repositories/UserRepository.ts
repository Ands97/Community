import { ModelStatic } from "sequelize";
import { IUser, IUserCreationAttributes, IUserInstance } from "../interfaces/models/IUser";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import Result from "../../utils/Result";
import ErrorApplication from "../../shared/ErrorAplicattion";

class UserRepository implements IUserRepository{
    private readonly _model: ModelStatic<IUserInstance>;

    constructor(model: ModelStatic<IUserInstance>){
        this._model = model;
    }

    public async findByEmail(email: string): Promise<Result<IUser>> {
        try {
            const user = await this._model.findOne({
                where: {
                    email
                }
            })

            if(!user){
                return Result.error(
                    new ErrorApplication(
                        'UserRepository > findByEmail',
                        'USER_DOES_NOT_EXISTS',
                        400,
                    )
                )
            }

            return Result.success(user)
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'UserRepository > findByEmail',
                    error as string,
                    500
                )
            )
        }
    }

    public async create(user: IUserCreationAttributes): Promise<Result<IUser>> {
        try {
            const newUser = await this._model.create(user);

            if(!newUser){
                return Result.error(
                    new ErrorApplication(
                        'UserRepository > create',
                        'ERROR_TO_CREATE_USER',
                        400,
                    )
                )
            }

            return Result.success(newUser)
        } catch (error) {
            return Result.error(
                new ErrorApplication(
                    'UserRepository > create',
                    error as string,
                    500
                )
            )
        }
    }
}

export default UserRepository;