class AppConfig {
    public readonly host: string = "localhost";
    public readonly user: string = "root";
    public readonly password: string = "NLYAN.lench.1977";
    public readonly database: string = "music_store";
    public readonly secretKey: string = "secretkey";
}

export const appConfig = new AppConfig();