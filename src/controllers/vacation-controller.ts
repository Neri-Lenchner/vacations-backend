import express, {Request, Response} from "express";
import {StatusCode} from "../models/enums";
import {Vacation} from "../models/vacation.model";
import {vacationService} from "../services/vacation-service";

class VacationController {

    router = express.Router();

    constructor() {
        this.router.post("/api/vacation", this.addVacation);
        this.router.get("/api/vacation-list/", this.getVacationList);
        this.router.put("/api/vacation/:id", this.updateVacation);
        this.router.delete("/api/vacation/:id", this.deleteVacation);
        this.router.get("/api/vacation/", this.getVacationListOffset);
    }

    public async addVacation(request: Request, response: Response) {
        const vacation: Vacation = new Vacation(request.body);
        const vacationFromDB = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(vacationFromDB);
    }

    public async updateVacation(request: Request, response: Response) {
        const id = +request.params.id;
        const vacation: Vacation = new Vacation(request.body);
        const vacationFromDB = await vacationService.updateVacation(id, vacation);
        response.json(vacationFromDB);
    }

    public async deleteVacation(request: Request, response: Response) {
        const id = +request.params.id;
        await vacationService.deleteVacation(id);
        response.sendStatus(StatusCode.NoContent);
    }

    public async getVacationList(request: Request, response: Response) {
        const vacationList: Vacation[] = await vacationService.getVacationList();
        response.json(vacationList);
    }

    // public async getVacationListOffset(request: Request, response: Response) {
    //     const offset: number = +request.params.offset;
    //     const limit: number = +request.params.limit;
    //     const vacationlistOffset: Vacation[] = await vacationService.getVacationListOffset(offset, limit);
    //     response.json(vacationlistOffset);
    // }

    public async getVacationListOffset(request: Request, response: Response) {
        const offset = Number(request.query.offset) || 0;
        const limit = Number(request.query.limit) || 10;

        const vacationList = await vacationService.getVacationListOffset(limit, offset);
        response.json(vacationList);
    }

}

export const vacationController = new VacationController();