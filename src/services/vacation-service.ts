import {ResultSetHeader} from "mysql2";
import {dal} from "../utils/dal";
import {Vacation} from "../models/vacation.model";
import {ResourceNotFound} from "../models/client-error";

class VacationService {

    public async addVacation(vacation: Vacation): Promise<Vacation> {
        vacation.validate();
        const sql = "INSERT INTO all_vacations (destination, description, startDate, endDate, cost, img) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.cost, vacation.img]) as ResultSetHeader;
        vacation.id = result.insertId;
        return vacation;
    }

    public async updateVacation(id: number, vacation: Vacation): Promise<Vacation> {
        vacation.validate();
        const sql = "UPDATE all_vacations set destination = ?, description = ?, startDate = ?, endDate = ?, cost = ?, img = ? WHERE id = ?";
        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.cost, vacation.img, id]) as ResultSetHeader;
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

    public async getVacationListOffset(limit: number, offset: number): Promise<Vacation[]> {
        const sql = "SELECT * FROM all_vacations LIMIT ? OFFSET ?";
        const vacationList = await dal.execute(sql, [limit, offset]) as Vacation[];
        return vacationList;
    }

}

export const vacationService = new VacationService();