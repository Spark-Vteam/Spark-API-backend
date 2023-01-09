import { Request, Response, Router, NextFunction } from 'express';

import bikeModel from '../../../models/bike';
const router = Router();

interface BikeInfo {
    Bikes_id: number;
    Position: string;
    Battery: number;
    Status: number;
    Speed: number;
}

/**
 * Bike ROUTE
 * /:
 *   get:
 *     summary: Display list for bikes
 *     description: Render all bikes
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/bike', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await bikeModel.showAllBikes(res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Bike ROUTE
 * /:
 *   get:
 *     summary: Display list for bikes within a radius
 *     description: Render all bikes within a radius
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/bike/:longitude/:latitude/:radius', async (req: Request, res: Response, next: NextFunction) => {
    const radiusInfo = req.params;

    try {
        return await bikeModel.getBikeRadius(radiusInfo, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Bike ROUTE
 * /:
 *   get:
 *     summary: Display list for all charging bikes
 *     description: Render charging all bikes
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/bike/charging', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await bikeModel.getAllChargingBikes(res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Bike ROUTE
 * /:
 *   get:
 *     summary: Display list for all charging bikes at one Station
 *     description: Render charging all bikes at a specific station
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/bike/charging/:id', async (req: Request, res: Response, next: NextFunction) => {
    const stationId = req.params.id;

    try {
        return await bikeModel.getChargingBikesAtStation(stationId, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Bike ROUTE
 * /:
 *   get:
 *     summary: Display information for one bike
 *     description: Render one bike
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.get('/bike/:id', async (req: Request, res: Response, next: NextFunction) => {
    const bikeId = req.params.id;

    try {
        return await bikeModel.getOneBike(bikeId, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Bike ROUTE
 * /:
 *   get:
 *     summary: Display bikes in a city
 *     description: Render bikes in a city
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.get('/bike/city/:city', async (req: Request, res: Response, next: NextFunction) => {
    const city = req.params.city;

    try {
        return await bikeModel.getBikesByCity(city, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Bike ROUTE
 * /:
 *   get:
 *     summary: Update information for one bike
 *     description: Render msg of update
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.put('/bike/:id', async (req: Request, res: Response, next: NextFunction) => {
    const bikeInfo = {
        bikeId: req.params.id,
        position: req.body.position,
        battery: req.body.battery,
        status: req.body.status,
        speed: req.body.speed,
    };

    try {
        return await bikeModel.updateOneBike(bikeInfo, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
