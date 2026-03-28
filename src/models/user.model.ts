export class User {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public id?: number;

    constructor(user: User) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.id = user.id;
    }

}