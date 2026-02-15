import { ZodError } from 'zod';
import { Response } from 'express';
import { message, statusCode } from '../utils/response.constants';
import { useErrorResponse } from './response.handlers';

export const handleZodError = <T>(err: ZodError<T> | unknown, res: Response) => {
    if (err instanceof ZodError) {
        const field = err.issues?.[0];
        const msg = field
            ? `Invalid '${field.path.join('.')}': ${field.message}`
            : message.validationError;
        return useErrorResponse(res, msg, statusCode.badRequest);
    }
    return null;
};