import { Request, Response, Router } from "express";
const router = Router();

import bikeModel from "../models/bike";

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
router.get("/bike", async (req: Request, res: Response) => {
    try {
        let allBikes = await bikeModel.showAllBikes();
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
router.get("/bike/:id", async (req: Request, res: Response) => {
    try {
        let oneBike = await bikeModel.getOneBike(req.params.id);

        return res.status(200).send(oneBike);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
