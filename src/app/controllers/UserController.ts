import { Request, Response } from "express";
import UserFactory from "../factories/UserFactory";
import { IUserCreationAttributes } from "../interfaces/models/IUser";
import Logger from "../../utils/Logger";


class UserController {
    public async register(req: Request, res: Response): Promise<void>{
        try {
            const user: IUserCreationAttributes = req.body;

            user.role = 'user';

            const service = UserFactory.getService();

            const {
                success,
                response,
                error
            } = await service.createUser(user);

            if(!success){
                throw error
            }

            res.status(201).json({
                id: response.id,
                firstName: response.firstName,
                lastName: response.lastName,
                phone: response.phone,
                birth: response.birth,
                email: response.email,
                role: response.role
            });
        } catch (error: any) {
            Logger.error('UserController > register', error)
            res.status(error.code ?? 500).json(error)
        }
    }
}

export default new UserController();