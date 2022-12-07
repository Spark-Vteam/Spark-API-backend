import { Request, Response, Router } from 'express';

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
router.get('/rent', async (req: Request, res: Response) => {
    try {
        const allRents = await rentModel.showAllRents();
        const allRentsData = JSON.parse(JSON.stringify(allRents));
        if (allRentsData[0].length === 0) {
            return res.status(404).send('No rents currently in the system');
        }
        return res.status(200).send(allRents);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.get('/rent/:id', async (req: Request, res: Response) => {
    try {
        const oneRent = await rentModel.getOneRent(req.params.id);
        const oneRentData = JSON.parse(JSON.stringify(oneRent));
        if (oneRentData[0].length === 0) {
            return res.status(404).send(`No rent with Id ${req.params.id} was found`);
        }
        return res.status(200).send(oneRent);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.get('/rent/user/:id', async (req: Request, res: Response) => {
    try {
        const rentByUserId = await rentModel.getRentsByUserId(req.params.id);

        const rentByUserIdData = JSON.parse(JSON.stringify(rentByUserId));

        if (rentByUserIdData[0].length === 0) {
            return res.status(404).send(`No rents for user Id ${req.params.id} was found`);
        }
        return res.status(200).send(rentByUserId);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.post('/rent/user/:id', async (req: Request, res: Response) => {
    const bikeId = req.body.bikeId;
    const userId = req.params.id;
    try {
        const newRent = await rentModel.createOneRent(userId, bikeId);

        return res.status(200).send(`New rent created`);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.post('/rent/:id', async (req: Request, res: Response) => {
    const rentId = req.params.id;
    try {
        const updateRent = await rentModel.updateOneRent(rentId);

        return res.status(200).send(`Rent with id ${rentId} has been updated`);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
