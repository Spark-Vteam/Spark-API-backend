import { Request, Response, NextFunction, Router } from 'express';

import rentModel from '../models/rent';
const router = Router();

interface RentInfo {
    Id: number;
    User_id: number;
    Start: string;
    StartTimeStamp: string;
    Destination: number;
    DestinationTimeStamp: string;
    Bike_id: number;
}

/**
 * Rent ROUTE
 * /:
 *   get:
 *     summary: Display
 *     description: Render welcome page
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.get('/rent', async (req: Request, res: Response, next: NextFunction) => {
    const allRents = await rentModel.showAllRents(res, next);

    return res.status(200).send({ success: true, data: allRents });
});

/**
 * Rent ROUTE
 *  /rent/:id:
 *   get:
 *     summary: One rent
 *     description: Render rent by rentId
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.get('/rent/:id', async (req: Request, res: Response, next: NextFunction) => {
    const rentId = req.params.id;
    const oneRent = await rentModel.getOneRent(rentId, res, next);
    return res.status(200).send({ success: true, data: oneRent });
});

/**
 * Rent ROUTE
 *  /rent/user/:id:
 *   get:
 *     summary: All rents by user
 *     description: Render rent by userId
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.get('/rent/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const rentByUserId = await rentModel.getRentsByUserId(userId, res, next);

    return res.status(200).send(rentByUserId);
});

/**
 * Rent ROUTE
 *  /rent/user/:id:
 *   get:
 *     summary: Create a new rent
 *     description: Create a active rent to user and taken bike
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.post('/rent/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    const bikeId = req.body.bikeId;
    const userId = req.params.id;

    await rentModel.createOneRent(userId, bikeId, res, next);

    return res.status(200).send({ success: true, msg: `New rent created for user ${userId}` });
});

/**
 * Rent ROUTE
 *  /rent/user/:id:
 *   get:
 *     summary: Update active rent
 *     description: Update rent for bike and user
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.put('/rent/:id', async (req: Request, res: Response, next: NextFunction) => {
    const rentId = req.params.id;

    await rentModel.updateOneRent(rentId, res, next);

    return res.status(200).send({ success: true, msg: `Rent with id ${rentId} has been updated` });
});

export default router;
