import {User} from "../models/user.model";
import mysql2, {ResultSetHeader} from "mysql2";
import {dal} from "../utils/dal";
import {ValidationError, AuthorizationError} from "../models/client-error";
import {securityService} from "./security-service";
import {Credentials} from "../models/credentials.model";
import bcrypt from "bcrypt";

class AuthService {

    public async register(user: User): Promise<string> {

        user.validate();
        const isEmailExist = await this.validateEmail(user.email);
        if (isEmailExist) throw new ValidationError("Email already taken");
        user.password = await securityService.hash(user.password);
        console.log(user.password);

        const sql = "insert into users (firstName, lastName, email, password, isAdmin) VALUES (?, ?, ?, ? ,?)";

        const result = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.isAdmin]) as ResultSetHeader;
        user.id = result.insertId
        return securityService.generateToken(user);
    }

    public async login(credentials: Credentials): Promise<string> {
        credentials.validate();
        // credentials.password = await securityService.hash(credentials.password);

        const sql = "select * from users where email = ?";
        const userList = await dal.execute(sql, [credentials.email]) as User[];
        const user: User = userList[0];
        if (!user) throw new AuthorizationError("Incorrect email or password");
        const isCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrect) throw new AuthorizationError("Incorrect email or password");
        return securityService.generateToken(user);
    }

    public async validateEmail(email: string): Promise<boolean> {

        const sql = "select * from users where email = ?";
        const userList = await dal.execute(sql, [email]) as User[];
        const user: User = userList[0];
        return user !== undefined;
    }

}

export const authService = new AuthService();