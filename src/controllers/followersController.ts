import express, {Request, Response} from "express";
import {followersService} from "../services/followersService";
import {Follower} from '../models/follower.model'

class FollowersController {
    public router = express.Router();

    constructor() {
        this.router.get("/api/vacations/followers/", this.getFollowersList);
    }

    public async getFollowersList(request: Request, response: Response): Promise<void> {
        const followersList: Follower[] = await followersService.getFollowersList();
        response.json(followersList);
    }

}

export const followersController = new FollowersController();