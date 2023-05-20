import Result from "../../../utils/Result";
import { IUser, IUserCreationAttributes } from "../models/IUser";

export interface IUserRepository{
    findByEmail(email: string): Promise<Result<IUser>>;
    create(user: IUserCreationAttributes): Promise<Result<IUser>>;
}