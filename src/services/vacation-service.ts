import {ResultSetHeader} from "mysql2";
import {dal} from "../utils/dal";
import {Vacation} from "../models/vacation.model";

class VacationService {

    public async addVacation(vacation: Vacation): Promise<Vacation> {

        vacation.validate();
        const sql = "insert into all-vacations(destination, description, startDate, endDate, cost, img) values (?, ?, ?, ?, ?, ?)";
        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.cost, vacation.img]) as ResultSetHeader;
        vacation.id = result.insertId;

        return vacation;
    }

}

export const vacationService = new VacationService();