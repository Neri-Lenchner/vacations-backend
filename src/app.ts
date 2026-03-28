import express from "express";
import cors from "cors";
import {loggerMiddleware} from "./middleware/logger-middleware";
import {errorMiddleware} from "./middleware/error-middleware";


class App {
    public start(): void {
        const server = express();
        server.use(cors());
        server.use(express.json());
        server.use(loggerMiddleware.consoleLog);
        server.use(errorMiddleware.serverError);
        server.use(errorMiddleware.catchAll);

        server.listen(4000, () => console.log("Server is running on port 4000")); // New process.
    }
}

const app = new App();
app.start();