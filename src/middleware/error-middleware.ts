import {Request, Response, NextFunction} from "express";
import {StatusCode} from "../models/enums";
import {RouteNotFound} from "../models/client-error";

class ErrorMiddleware {
    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {
        const status: any = err.status ?? StatusCode.ServerError;
        const message: string = err.message;

        response.status(status).json({error: message});
    }

    public serverError(request: Request, response: Response, next: NextFunction): void {
        next(new RouteNotFound(request.originalUrl));
    }
}

export const errorMiddleware: ErrorMiddleware = new ErrorMiddleware();
