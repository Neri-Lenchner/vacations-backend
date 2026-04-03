import {dal} from '../utils/dal';
import {Follower} from "../models/follower.model";
import {ResultSetHeader} from "mysql2";
import {ResourceNotFound} from "../models/client-error";

class FollowersService {

    public async getFollowersList() {
        const sql = `SELECT * FROM followers`;
        const followersList = await dal.execute(sql) as Follower[];
        return followersList;
    }

    public async addFollower(follower: Follower): Promise<Follower>  {
        const sql = `INSERT INTO followers (userId, vacationId) VALUES (?, ?)`;
        const result = await dal.execute(sql, [follower.userId, follower.vacationId]) as ResultSetHeader;
        follower.id = result.insertId;
        return follower;
    }

    public async deleteFollower(id: number): Promise<void> {
        const sql = `DELETE FROM followers WHERE id = ?`;
        const result = await dal.execute(sql, [id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
    }
}

export const followersService = new FollowersService();