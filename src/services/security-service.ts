import bcrypt from "bcrypt";
import jwt, {SignOptions} from "jsonwebtoken";
import {User} from "../models/user.model";
import {appConfig} from "../utils/app-config";


class SecurityService {

    public async hash(passWord: string): Promise<string> {
        // return crypto.createHash("sha512").update(text).digest("hex");
        return await bcrypt.hash(passWord, 10);
    }

    public generateToken(user: User): string  {
        delete (user as any).password;
        const container = { user };
        const options: SignOptions = {expiresIn: "30y"};
        return jwt.sign(container, appConfig.secretKey, options);
    }

    public validateToken(token: string): boolean {
        if (!token) return false;
        try {
            jwt.verify(token, appConfig.secretKey);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public validateAdmin(token: string): boolean {
        if (!token) return false;
        try {
            jwt.verify(token, appConfig.secretKey);
            const container = jwt.decode(token) as { user: User }
            const user: User = container.user;
            return user.isAdmin;
        }
        catch (error) {
            return false;
        }
    }

}

export const securityService = new SecurityService();