import express, {Request, Response} from "express";
import {StatusCode} from "../models/enums";
import {Vacation} from "../models/vacation.model";
import {vacationService} from "../services/vacation-service";
import {dal} from "../utils/dal";

class VacationController {

    router = express.Router();

    constructor() {
        this.router.post("/api/vacation", this.addVacation);
        this.router.get("/api/vacation-list/", this.getVacationList);
    }

    public async addVacation(request: Request, response: Response) {
        const vacation: Vacation = new Vacation(request.body);
        const vacationFromDB = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(vacationFromDB);
    }

    public async getVacationList(request: Request, response: Response) {
        const vacationList = await vacationService.getVacationList();
        response.json(vacationList);
    }

}

export const vacationController = new VacationController();