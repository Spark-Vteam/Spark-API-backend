import { NextFunction, Request, Response, Router } from 'express';

import stationModel from '../../../models/station';
const router = Router();

/**
 * Stations ROUTE
 *  /station:
 *   get:
 *     summary: List of stations
 *     description: Render  page
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/station', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await stationModel.showAllStations(res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Stations ROUTE
 *  /station/:id:
 *   get:
 *     summary: One station
 *     description: Render station by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/station/:id', async (req: Request, res: Response, next: NextFunction) => {
    const stationId = req.params.id;
    try {
        return await stationModel.getOneStation(stationId, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
