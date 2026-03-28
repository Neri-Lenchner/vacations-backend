import {User} from "../models/user.modl";
import mysql2, {ResultSetHeader} from "mysql2";
import {dal} from "../utils/dal";

class UserService {

    public async register(user: User): Promise<string> {
        // Validation.
        // user.validate();
        // const isEmailExist = await this.validateEmail(user.email);
        // if (isEmailExist) throw new ValidationError("Email already taken");
        // user.password = await secureService.hash(user.password);
        // console.log(user.password);

        // sql query
        const sql = "insert into user (firstName, lastName, email, password, isAdmin) VALUES (?, ?, ?, ? ,?)";
        // execute query
        const result = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.isAdmin]) as ResultSetHeader;
        user.id = result.insertId
        return secureService.generateToken(user);
    }
}