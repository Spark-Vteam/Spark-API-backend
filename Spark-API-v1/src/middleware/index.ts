/**
 * General middleware.
 */
'use strict';
import express, { Application, Request, Response, NextFunction } from 'express';
/**
 * Log incoming requests to console to see who accesses the server
 * on what route.
 *
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
export function logIncomingToConsole(req: Request, res: Response, next: NextFunction) {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
}

/**
 * Log app details to console when starting up.
 *
 * @return {void}
 */
// export function logStartUpDetailsToConsole() {
// const routes: any[] = [];

// // Find what routes are supported
// app._router.stack.forEach((middleware: { route: any; name: string; handle: { stack: any[] } }) => {
//     if (middleware.route) {
//         // Routes registered directly on the app
//         routes.push(middleware.route);
//     } else if (middleware.name === 'router') {
//         // Routes added as router middleware
//         middleware.handle.stack.forEach((handler) => {
//             let route;

//             route = handler.route;
//             route && routes.push(route);
//         });
//     }
// });

// console.info(`Server is listening on port ${port}.`);
// console.info('Available routes are:');
// console.info(routes);
// }
