import express, {Request, Response} from "express";
import {StatusCode} from "../models/enums";
import {Vacation} from "../models/vacation.model";
import {vacationService} from "../services/vacation-service";

class VacationController {

    router = express.Router();

    constructor() {
        this.router.get("/api/vacation/", this.getVacationListOffset);
        this.router.get("/api/vacation-list/", this.getVacationList);
        this.router.post("/api/vacation", this.addVacation);
        this.router.put("/api/vacation/:id", this.updateVacation);
        this.router.delete("/api/vacation/:id", this.deleteVacation);
    }

    public async addVacation(request: Request, response: Response): Promise<void> {
        const vacation: Vacation = new Vacation(request.body);
        const vacationFromDB = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(vacationFromDB);
    }

    public async updateVacation(request: Request, response: Response): Promise<void> {
        const id = +request.params.id;
        const vacation: Vacation = new Vacation(request.body);
        const vacationFromDB = await vacationService.updateVacation(id, vacation);
        response.json(vacationFromDB);
    }

    public async deleteVacation(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        await vacationService.deleteVacation(id);
        response.sendStatus(StatusCode.NoContent);
    }

    public async getVacationList(request: Request, response: Response): Promise<void> {
        const vacationList: Vacation[] = await vacationService.getVacationList();
        response.json(vacationList);
    }

    public async getVacationListOffset(request: Request, response: Response) {
        const limit: number = Number(request.query.limit) || 10;
        const offset: number = Number(request.query.offset) || 0;
        const vacationList: Vacation[] = await vacationService.getVacationListOffset(limit, offset);
        response.json(vacationList);
    }

}

export const vacationController = new VacationController();