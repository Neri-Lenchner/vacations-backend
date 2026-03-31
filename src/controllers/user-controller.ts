import express, {Request, Response} from "express";
import {userService} from "../services/user-service";
import {User} from "../models/user.model";
import {StatusCode} from "../models/enums";

class UserController {

    public router = express.Router();

    constructor() {
        this.router.get("/api/users/", this.getUserList);
        this.router.get("/api/users/:id", this.getUser);
        this.router.put("/api/users/:id", this.updateUser);
        this.router.delete("/api/users/:id", this.deleteUser);
    }

    public async getUserList(request: Request, response: Response): Promise<void> {
        const userList: User[] = await userService.getUserList();
        response.json(userList);
    }

    public async getUser(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        const user: User = await userService.getUser(id);
        response.json(user);
    }

    public async updateUser(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        const user = new User(request.body);
        await userService.updateUser(id, user);
        response.json(user);
    }

    public async deleteUser(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        await userService.deleteUser(id);
        response.sendStatus(StatusCode.NoContent);
    }

}

export const userController = new UserController();