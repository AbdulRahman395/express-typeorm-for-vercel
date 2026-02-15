import { Request } from "express";

export interface JwtPayload {
    id: number;
    name: string;
    email: string;
    phone: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                name: string;
                email: string;
                phone: string;
            };
        }
    }
}

export interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
    };
}
