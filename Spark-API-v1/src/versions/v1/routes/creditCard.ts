import { NextFunction, Request, Response, Router } from 'express';

import creditCardModel from '../../../models/creditCard';
const router = Router();

interface creditCardInfo {
    id: number;
    pan: string;
    expiry: string;
    firstname: string;
    lastname: string;
    truncpan: string;
}

/**
 * creditCard ROUTE
 * /creditCard:
 *   post:
 *     summary: Create a creditCard
 *     description: Creates a creditcard for a user
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post('/creditCard/:id', async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.id;
    const creditCardInfo = req.body;
    try {
        return creditCardModel.saveCreditCard(userId, creditCardInfo, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
