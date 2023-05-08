import { AuthenticationOptions } from "@adminjs/express";
import bcrypt from 'bcrypt'
import { User } from "../../app/models";

class AuthOptions {
    private _options: AuthenticationOptions = {
        authenticate: async (email, password) => {
            const user = await User.findOne({ where: { email } });

            if (!user || user.role == 'user') {
                return
            }

            const matched = await bcrypt.compare(password, user.password);

            if (!matched) {
                return
            }

            return user
        },
        cookiePassword: 'senha'
    }

    public getOptions(): AuthenticationOptions {
        return this._options
    }
}

export default new AuthOptions();
