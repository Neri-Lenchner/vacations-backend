export class Follower {
    public userId: number;
    public vacationId: number;
    public id?: number;
    constructor(follower: Follower) {
        this.userId = follower.userId;
        this.vacationId = follower.vacationId;
    }
}