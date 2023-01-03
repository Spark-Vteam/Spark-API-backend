import { Request, Response, NextFunction } from 'express';

/**
 * Represents an error
 * @constructor
 */
// export class AppError extends Error {
//     status: number;
//     constructor(status: number, message: string) {
//         super(message);

//         Object.setPrototypeOf(this, new.target.prototype);
//         this.name = Error.name;
//         this.status = status;
//         Error.captureStackTrace(this);
//     }
// }

// export class DbError {
//     message = 'Db Error';
//     status!: number;
//     info!: any;

//     constructor(status: number = 500, info: any = {}) {
//         this.status = status;
//         this.info = info;
//     }
// }

/**
 * Error handling Middleware function for logging 500 error message
 *
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Promise}
 */

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
    if (error) {
        // Return a custom error message to the client
        res.status(400).send({ success: false, msg: {error}});
    } else {
        // Return the error to the client
        res.status(500).send({ success: false, msg: {error} });
    }
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
export function invalidPathHandler(req: Request, res: Response, next: NextFunction): void {
    res.status(404).send({ error: true, msg: 'invalid path' });
}
