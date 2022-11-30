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
    let allBikes = await bikeModel.showAllBikes();
    res.send(allBikes);
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
    let oneBike = await bikeModel.getOneBike(req.params.id);
    let oneBikeData = JSON.parse(JSON.stringify(oneBike));
    
    if (oneBikeData[0].length === 0) {
        return res.status(404).send("No bike for that bike Id was found");
    }
    return res.status(200).send(oneBike);
});

export default router;
