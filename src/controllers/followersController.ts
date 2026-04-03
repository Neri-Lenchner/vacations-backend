import express, {Request, Response} from "express";
import {followersService} from "../services/followersService";
import {Follower} from '../models/follower.model'
import {StatusCode} from "../models/enums";

class FollowersController {
    public router = express.Router();

    constructor() {
        this.router.get("/api/vacations/followers/", this.getFollowersList);
        this.router.post("/api/vacations/followers", this.addFollower);
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

}

export const followersController = new FollowersController();