
import { IUserService } from "../interfaces/services/IUserService";
import { User } from "../models";
import UserRepository from "../repositories/UserRepository";

import UserService from "../services/UserService";

class UserFactory {
    public static getService(): IUserService {
        return new UserService(
            new UserRepository(User)
        )
    }
}

export default UserFactory;