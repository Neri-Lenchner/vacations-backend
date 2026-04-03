import {dal} from '../utils/dal';
import {Follower} from "../models/follower.model";

class FollowersService {

    public async getFollowersList() {
        const sql = `SELECT * FROM followers`;
        const followersList = await dal.execute(sql) as Follower[];
        return followersList;
    }
}

export const followersService = new FollowersService();