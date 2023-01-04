import { Request, Response, NextFunction } from 'express';

/**
 * Represents an error
 * @constructor
 */
export class CustomError extends Error {
    success: boolean;
    msg: string;

    constructor(success: boolean, msg: string) {
        super(msg);
        this.success = success;
        this.msg = msg;
    }
}
/**
 * Error handling Middleware function for logging 500 error message
 *
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Promise}
 */
export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    console.log('ERRORHANDLER');
    console.log(error);

    if (error instanceof CustomError) {
        return res.status(400).json({ status: 400,  error });
    }
    return res.status(500).json({ status: 500, msg: { error } });
}

/**
 * Fallback Middleware function for returning 404 error for undefined paths
 *
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
export function invalidPathHandler(req: Request, res: Response, _next: NextFunction): void {
    res.status(404).send({ error: true, msg: 'invalid path' });
}
