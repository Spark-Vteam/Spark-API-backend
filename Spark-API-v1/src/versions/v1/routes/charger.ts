import { NextFunction, Request, Response, Router } from 'express';

import chargerModel from '../../../models/chargers';
const router = Router();

/**
 * Charger ROUTE
 * /:
 *   get:
 *     summary: Display all chargers
 *     description: Render list of all chargers
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/charger', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await chargerModel.showAllChargers(res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Charger ROUTE
 * /:
 *   get:
 *     summary: Display information for one charger
 *     description: Render a specific charger
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/charger/:id', async (req: Request, res: Response, next: NextFunction) => {
    const chargerId = req.params.id;

    try {
        return await chargerModel.getOneCharger(chargerId, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Charger ROUTE
 * /:
 *   put:
 *     summary: Change status of one charger
 *     description: Update a status for one charger
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/charger/:id', async (req: Request, res: Response, next: NextFunction) => {
    const chargerInfo = {
        id: req.params.id,
        status: req.body.status,
    };

    try {
        return await chargerModel.updateStatus(chargerInfo, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
