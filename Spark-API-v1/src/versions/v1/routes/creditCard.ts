import { NextFunction, Request, Response, Router } from 'express';

import creditCardModel from '../../../models/creditCard';
const router = Router();

interface creditCardInfo {}

/**
 * creditCard ROUTE
 * /creditCard:
 *   get:
 *     summary: Display list of creditCard
 *     description: Render all creditCard from database
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/creditCard', async (req: Request, res: Response, next: NextFunction) => {
    res.send('creditCards');
});

module.exports = router;
