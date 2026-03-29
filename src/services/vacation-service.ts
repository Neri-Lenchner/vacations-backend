import {ResultSetHeader} from "mysql2";
import {dal} from "../utils/dal";
import {Vacation} from "../models/vacation.model";

class VacationService {

    public async addVacation(vacation: Vacation): Promise<Vacation> {

        vacation.validate();
        const sql = "INSERT INTO all_vacations (destination, description, startDate, endDate, cost, img) VALUES (?, ?, ?, ?, ?, ?)";

        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.cost, vacation.img]) as ResultSetHeader;
        vacation.id = result.insertId;

        return vacation;
    }

    public async getVacationList(): Promise<Vacation[]> {

        const sql = "SELECT * FROM all_vacations";

        const vacationList = await dal.execute(sql) as Vacation[];

        return vacationList;
    }

}

export const vacationService = new VacationService();