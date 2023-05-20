import Result from "../../../utils/Result";
import { IUser, IUserCreationAttributes } from "../models/IUser";

export interface IUserService{
    createUser(user: IUserCreationAttributes): Promise<Result<IUser>>;
}