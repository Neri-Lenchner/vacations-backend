import {dal} from '../utils/dal';

class FollowerService {

    public async getFollowersList() {
        const sql = `SELECT * FROM followers`;
        const followersList = await dal.execute(sql);
        return followersList;
    }
}

export const followerService = new FollowerService();