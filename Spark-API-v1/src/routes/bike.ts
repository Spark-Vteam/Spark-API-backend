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

export default router;
