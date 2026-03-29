import express, {Request, Response} from "express";
import {StatusCode} from "../models/enums";
import {Vacation} from "../models/vacation.model";
import {vacationService} from "../services/vacation-service";

class VacationController {

    router = express.Router();

    constructor() {
        this.router.post("/api/vacation", this.addVacation);
    }

    public async addVacation(request: Request, response: Response) {
        const vacation: Vacation = new Vacation(request.body);
        const vacationFromDB = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(vacationFromDB);
    }

}

export const vacationController = new VacationController();