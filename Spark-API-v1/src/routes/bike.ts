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
router.get('/v1/bike', async (req: Request, res: Response) => {
    try {
        const allBikes = await bikeModel.showAllBikes();
        return res.status(200).send(allBikes);
    } catch (error) {
        return res.status(404).send(error);
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
router.get('/v1/bike/radius', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const bikeRadius = await bikeModel.getBikeRadius(req.params.id);

        return res.status(200).send('bikeradius');
    } catch (error) {
        return res.status(404).send(error);
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
router.get('/v1/bike/:id', async (req: Request, res: Response, next: NextFunction) => {
    const bikeId = req.params.id;
    const oneBike = await bikeModel.getOneBike(bikeId, res, next);
    const oneBikeData = JSON.parse(JSON.stringify(oneBike));

    return res.status(200).send(oneBikeData[0]);
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
router.put('/bike/:id', async (req: Request, res: Response) => {
    try {
        const bikeInfo = {
            bikeId: req.body.bikeId,
            position: req.body.position,
            battery: req.body.battery,
            status: req.body.status,
            speed: req.body.speed,
        };
        const updateBike = await bikeModel.updateOneBike(
            bikeInfo.bikeId,
            bikeInfo.position,
            bikeInfo.battery,
            bikeInfo.status,
            bikeInfo.speed
        );

        return res.status(200).send(`Bike with id ${bikeInfo.bikeId} has been updated:\n
            Postion: ${bikeInfo.position},
            Battery: ${bikeInfo.battery},
            Status: ${bikeInfo.status},
            Speed: ${bikeInfo.speed}`);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
