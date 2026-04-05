import {Query, QueryResult, ResultSetHeader} from "mysql2";
import {dal} from "../utils/dal";
import {Vacation} from "../models/vacation.model";
import {ResourceNotFound} from "../models/client-error";
import {appConfig} from "../utils/app-config";

class VacationService {

    public async addVacation(vacation: Vacation): Promise<Vacation> {
        vacation.validate();
        const sql = "INSERT INTO all_vacations (destination, description, startDate, endDate, cost, img) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.cost, vacation.imageName]) as ResultSetHeader;
        vacation.id = result.insertId;
        return vacation;
    }

    public async updateVacation(id: number, vacation: Vacation): Promise<Vacation> {
        vacation.validate();
        const sql = "UPDATE all_vacations set destination = ?, description = ?, startDate = ?, endDate = ?, cost = ?, img = ? WHERE id = ?";
        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.cost, vacation.imageName, id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
        return vacation;
    }

    public async deleteVacation(id: number): Promise<void> {
        const sql = "DELETE FROM all_vacations WHERE id = ?";
        const result = await dal.execute(sql, [id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
    }

    public async getVacationList(): Promise<Vacation[]> {
        const sql = "SELECT * FROM all_vacations";
        const vacationList = await dal.execute(sql) as Vacation[];
        return vacationList;
    }

    public async getVacationListOffset(offset: number, limit: number): Promise<Vacation[]> {
        // const sql = "SELECT * FROM all_vacations LIMIT ? OFFSET ?";
        // if (limit > appConfig.offsetLimit) {
        //     throw new Error ("Limit exceeds maximum allowed");
        // }

        if (limit <= 0 || limit > appConfig.offsetLimit) {
            throw new Error("Invalid limit value");
        }

        // const sql = "SELECT * FROM vacations LIMIT ? OFFSET ?";

        const sql = "SELECT * FROM all_vacations ORDER BY startDate DESC LIMIT ? OFFSET ?";

        const vacationList = await dal.execute(sql, [limit, offset]) as Vacation[];
        return vacationList;
    }

    public async getVacationCount(): Promise<number> {
        const sql = "SELECT COUNT(*) AS total FROM vacations.all_vacations;";

        const result = await dal.execute(sql) as { total: number }[];

        return Number(result[0].total);
    }

    public async getUsersFollowedVacations(id: number): Promise<Vacation[]> {
        const sql = `SELECT v.* FROM all_vacations v JOIN followers f ON v.id = f.vacationId WHERE f.userId = ? ORDER BY v.startDate`;
        const followedVacations = await dal.execute(sql, [id]) as Vacation[];
        return followedVacations;
    }

    public async getUnstartedVacations(): Promise<Vacation[]> {
        const sql = `SELECT * FROM vacations WHERE startDate > CURDATE()`;
        const vacations = await dal.execute(sql) as Vacation[];
        return vacations;
    }

    // public async getVacationCount(): Promise<number> {
    //     const sql = "SELECT COUNT(*) AS total FROM vacations.all_vacations;";
    //
    //     const result = await dal.execute(sql) as QueryResult;
    //
    //
    //
    //     // Extract the number from the result
    //     const total: number = result[0].total;
    //
    //     // const Number(total)
    //     return total;
    // }


    // public async getVacationListOffset(limit: number, offset: number): Promise<Vacation[]> {
    //     const sql = "SELECT * FROM all_vacations LIMIT ? OFFSET ?";
    //     const vacationList = await dal.execute(sql, [limit, offset]) as Vacation[];
    //     return vacationList;
    // }

}

export const vacationService = new VacationService();