class AppConfig {
    public readonly host: string = "localhost";
    public readonly user: string = "root";
    public readonly password: string = "NLYAN.lench.1977";
    public readonly database: string = "before_the_test_ex";
    public readonly secretKey: string = "secretkey";
}

export const appConfig = new AppConfig();