import express, {Request, Response} from "express";
import {followersService} from "../services/followersService";
import {Follower} from '../models/follower.model'
import {StatusCode} from "../models/enums";

class FollowersController {
    public router = express.Router();

    constructor() {
        this.router.get("/api/vacations/followers/", this.getFollowersList);
        this.router.post("/api/vacations/followers", this.addFollower);
        this.router.delete("/api/vacations/followers/:id", this.deleteFollower);
    }

    public async getFollowersList(request: Request, response: Response): Promise<void> {
        const followersList: Follower[] = await followersService.getFollowersList();
        response.json(followersList);
    }

    public async addFollower(request: Request, response: Response): Promise<void> {
        const follower: Follower = new Follower(request.body);
        const followerFromDB: Follower = await followersService.addFollower(follower);
        response.status(StatusCode.Created).json(followerFromDB);
    }

    public async deleteFollower(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        await followersService.deleteFollower(id);
        response.sendStatus(StatusCode.NoContent);
    }

}

export const followersController = new FollowersController();