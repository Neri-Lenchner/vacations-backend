import express from "express";
import cors from "cors";


class App {
    public start(): void {
        const server = express();
        server.use(cors());
        server.use(express.json());
    }
}

const app = new App();
app.start();