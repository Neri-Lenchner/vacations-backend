import Joi from "joi";

export class User {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public isAdmin: boolean;
    public id?: number;

    constructor(user: User) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
        this.id = user.id;
    }

    private static validationSchema = Joi.object({
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(256),
        isAdmin: Joi.boolean().required(),
        id: Joi.number().optional().positive()
    });

}