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
 * /creditCard/:id:
 *   get:
 *     summary: Get one credit card
 *     description: Displays one credit card
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/creditCard/:id', async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.id;
    try {
        return creditCardModel.getCardsByUser(userId, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * creditCard ROUTE
 * /creditCard/:id:
 *   get:
 *     summary: Get one credit card by id
 *     description: Displays one credit card for a user
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/creditCard/card/:id', async (req: Request, res: Response, next: NextFunction) => {
    let cardId = req.params.id;
    try {
        return creditCardModel.getCard(cardId, res, next);
    } catch (error) {
        next(error);
    }
});

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

/**
 * creditCard ROUTE
 * /creditCard/:id:
 *   delete:
 *     summary: Delete one credit card
 *     description: Delete one credit card
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.delete('/creditCard/:id', async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.id;
    try {
        return creditCardModel.deleteCard(userId, res, next);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
