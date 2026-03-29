import {Request, Response, NextFunction} from "express";
import {securityService} from "../services/security-service";
import {AuthorizationError} from "../models/client-error";

class TokenMiddleware {

    public validateToken(request: Request, response: Response, next: NextFunction) {
        const token: string | undefined = request.headers.authorization?.substring(7);
        if (securityService.validateToken(token!)) {
            next();
            return;
        }
        next(new AuthorizationError("Unauthorized"));
    }

    public validateAdmin(request: Request, response: Response, next: NextFunction) {
        const token: string | undefined  = request.headers.authorization?.substring(7);
        if (securityService.validateAdmin(token!)) {
            next();
            return;
        }
        next(new AuthorizationError("Unauthorized"));
    }

}

export const tokenMiddleware = new TokenMiddleware();