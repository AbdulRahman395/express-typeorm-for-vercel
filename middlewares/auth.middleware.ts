import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload, AuthenticatedRequest } from '../types/request.types';
import { message, statusCode } from '../utils/response.constants';
import { useErrorResponse } from '../utils/response.handlers';

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return useErrorResponse(res, message.tokenMissing, statusCode.unauthorized);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            phone: decoded.phone,
        };

        if (!req.user) {
            return useErrorResponse(res, message.unauthorizedAccess, statusCode.unauthorized);
        }

        next();
    } catch (err) {
        return useErrorResponse(res, message.invalidToken, statusCode.unauthorized);
    }
};