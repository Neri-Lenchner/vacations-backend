import {dal} from "../utils/dal";
import {ResourceNotFound} from "../models/client-error";
import {User} from "../models/user.model";
import {ResultSetHeader} from "mysql2";

class UserService {

    public async getUserList(): Promise<User[]> {
        const sql = `SELECT * FROM users`;
        const userList = await dal.execute(sql) as User[];
        return userList
    }

    public async getUser(id: number): Promise<User> {
        const sql = `SELECT * FROM users WHERE id = ?`;
        const userArr = await dal.execute(sql, [id]) as User[];
        const user: User = userArr[0];
        if (!user) {
            throw new ResourceNotFound(id);
        }
        return user;

    }

    public async updateUser(id: number, user: User): Promise<void> {
        user.validate();
        const sql = "UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ?, isAdmin = ? WHERE id = ?";
        const result = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.isAdmin, id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
    }

    public async deleteUser(id: number): Promise<void> {
        const sql = "DELETE FROM courses WHERE id = ?";
        const result = await dal.execute(sql, [id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
    }
}

export const userService = new UserService();