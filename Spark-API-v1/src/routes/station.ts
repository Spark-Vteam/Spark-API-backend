import { Request, Response, Router } from "express";
const router = Router();

import stationModel from "../models/station";

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
router.get("/station", async (req: Request, res: Response) => {
    let allStations = await stationModel.showAllStations();

    res.send(allStations);
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
router.get("/station/:id", async (req: Request, res: Response) => {
    let oneStation = await stationModel.getOneStation(req.params.id);

    res.send(oneStation);
});

export default router;
