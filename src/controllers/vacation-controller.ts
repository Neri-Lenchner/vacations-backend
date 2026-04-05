import express, {Request, response, Response} from "express";
import {StatusCode} from "../models/enums";
import {Vacation} from "../models/vacation.model";
import {vacationService} from "../services/vacation-service";
import {uploadImageService} from "../services/uploadImageService";
import {dal} from "../utils/dal";

class VacationController {

    router = express.Router();

    constructor() {
        this.router.get("/api/vacations/", this.getVacationListOffset);
        this.router.get("/api/vacations/user/:id/followers/", this.getUsersFollowedVacations);
        this.router.get("/api/vacations/upcoming/", this.getUpcomingVacations);
        this.router.get("/api/vacations/active/", this.getActiveVacations);
        this.router.get("/api/vacations/count/", this.getVacationCount);
        this.router.post("/api/vacation", uploadImageService.upload.single("image"), this.addVacation);
        this.router.put("/api/vacation/:id", this.updateVacation);
        this.router.delete("/api/vacation/:id", this.deleteVacation);
        // this.router.get("/api/vacation-list/", this.getVacationList); // no option to get a list with no offset
    }

    public async getVacationCount(request: Request, response: Response): Promise<void> {
        const vacationCount = await vacationService.getVacationCount();
        response.json(vacationCount);
    }

    public async addVacation(request: Request, response: Response): Promise<void> {
        const vacation: Vacation = new Vacation(request.body);
        vacation.imageName = request.file?.filename
        const vacationFromDB: Vacation = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(vacationFromDB);
    }

    public async updateVacation(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        const vacation: Vacation = new Vacation(request.body);
        const vacationFromDB: Vacation = await vacationService.updateVacation(id, vacation);
        response.json(vacationFromDB);
    }

    public async deleteVacation(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        await vacationService.deleteVacation(id);
        response.sendStatus(StatusCode.NoContent);
    }

    public async getUsersFollowedVacations(request: Request, response: Response): Promise<void>  {
        const id: number = +request.params.id;
        const followedVacations = await vacationService.getUsersFollowedVacations(id);
        response.json(followedVacations);
    }

    public async getUpcomingVacations(request: Request, response: Response): Promise<void>  {
        const vacationList = await vacationService.getUpcomingVacations();
        response.json(vacationList);
    }

    public async getActiveVacations(request: Request, response: Response): Promise<void> {
        const vacationList = await vacationService.getActiveVacations();
        response.json(vacationList);
    }



    public async getVacationList(request: Request, response: Response): Promise<void> {
        const vacationList: Vacation[] = await vacationService.getVacationList();
        response.json(vacationList);
    }

    // public async getVacationListOffset(request: Request, response: Response): Promise<void> {
    //     const offset: number = Number(request.query.offset) || 0;
    //     const vacationList: Vacation[] = await vacationService.getVacationListOffset(offset);
    //     response.json(vacationList);
    // }

    public async getVacationListOffset(request: Request, response: Response): Promise<void> {
        const offset: number = Number(request.query.offset) || 0;
        const limit: number = Number(request.query.limit) || 10;

        const vacationList: Vacation[] = await vacationService.getVacationListOffset(offset, limit);
        response.json(vacationList);
    }



}

export const vacationController = new VacationController();