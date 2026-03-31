class AppConfig {
    public readonly host: string = "localhost";
    public readonly user: string = "root";
    public readonly password: string = "NLYAN.lench.1977";
    public readonly database: string = "vacations";
    public readonly secretKey: string = "bapbNGN$_4MXj-*^";
    public readonly offsetLimit: number = 10;
}

export const appConfig = new AppConfig();