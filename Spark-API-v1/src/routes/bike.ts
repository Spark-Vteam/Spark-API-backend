import { Request, Response, Router, NextFunction } from 'express';

import bikeModel from '../models/bike';
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
router.get('/v1/bike', async (req: Request, res: Response, next: NextFunction) => {
    const allBikes = await bikeModel.showAllBikes(res, next);
    return res.status(200).send({ success: true, data: allBikes });
});

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
router.get('/v1/bike/radius', async (req: Request, res: Response, next: NextFunction) => {
    const radiusInfo = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        radius: req.body.radius,
    };

    const bikeRadius = await bikeModel.getBikeRadius(radiusInfo, res, next);
    return res.status(200).send({ success: true, data: bikeRadius });
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
router.get('/v1/bike/:id', async (req: Request, res: Response, next: NextFunction) => {
    const bikeId = req.params.id;
    const oneBike = await bikeModel.getOneBike(bikeId, res, next);

    return res.status(200).send({ success: true, data: oneBike });
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
router.put('/v1/bike/:id', async (req: Request, res: Response, next: NextFunction) => {
    const bikeInfo = {
        bikeId: req.params.id,
        position: req.body.position,
        battery: req.body.battery,
        status: req.body.status,
        speed: req.body.speed,
    };
    await bikeModel.updateOneBike(bikeInfo, res, next);

    return res.status(200).send({ success: true, msg: `Bike with id ${bikeInfo.bikeId} has been updated` });
});

export default router;
