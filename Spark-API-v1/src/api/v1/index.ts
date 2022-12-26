import express, { Application, Request, Response, Router } from 'express';
const router = Router();

/**
 * Main ROUTE
 * /v2/:
 *   get:
 *     summary: Display main
 *     description: Render main page
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/', (req: Request, res: Response) => {
    res.send('Hello v1.0 GET API');
});

module.exports = router;