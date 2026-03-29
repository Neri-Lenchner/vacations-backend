export class Vacation {
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public cost: number;
    public img: string;
    public id?: number;

    constructor(vacation: Vacation) {
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.cost = vacation.cost;
        this.img = vacation.img;
        this.id = vacation.id;
    }
}