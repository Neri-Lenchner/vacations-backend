import {dal} from '../utils/dal';
import {Follower} from "../models/follower.model";
import {ResultSetHeader} from "mysql2";

class FollowersService {

    public async getFollowersList() {
        const sql = `SELECT * FROM followers`;
        const followersList = await dal.execute(sql) as Follower[];
        return followersList;
    }

    public async addFollower(follower: Follower): Promise<Follower>  {
        const sql = `INSERT INTO followers (userId, vacationId) VALUES (?, ?, ?)`;
        const result = await dal.execute(sql, [follower.userId, follower.vacationId]) as ResultSetHeader;
        follower.id = result.insertId;
        return follower;
    }
}

export const followersService = new FollowersService();