import Joi from "joi";
import {ValidationError} from "./client-error";

export class Vacation {
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public cost: number;
    public imageName?: string;
    public id?: number;

    constructor(vacation: Vacation) {
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.cost = vacation.cost;
        this.imageName = vacation.imageName;
        this.id = vacation.id;
    }

    private static validationSchema = Joi.object({
        destination: Joi.string().required().min(2).max(20),
        description: Joi.string().required().min(2).max(100),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        cost: Joi.number().required().positive(),
        img: Joi.string().optional(),
        id: Joi.number().optional().positive()
    });

    public validate() {
        const result = Vacation.validationSchema.validate(this);
        if (result.error) {
            throw new ValidationError(result.error.message);
        }
    }
}