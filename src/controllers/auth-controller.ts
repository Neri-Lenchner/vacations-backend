import express, {Request, Response} from "express";
import {StatusCode} from "../models/enums";
import {User} from "../models/user.model";
import {userService} from "../services/user-service";
import {Credentials} from "../models/credentials.model";

class AuthController {

    router = express.Router();

    constructor() {
        this.router.post("/api/register", this.register);
        this.router.post("/api/login/", this.login);
    }

    public async register(request: Request, response: Response) {
        console.log("Register called, request.body:", request.body);
        const user: User = new User(request.body);

        const token: string = await userService.register(user);
        response.status(StatusCode.Created).json({token});
    }

    public async login(request: Request, response: Response) {
        const credentials: Credentials = new Credentials(request.body);
        const token = await userService.login(credentials);
        response.json({token});
    }

}

export const authController = new AuthController();