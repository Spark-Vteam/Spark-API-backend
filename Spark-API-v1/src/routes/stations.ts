import { Request, Response, Router } from "express";
const router = Router();

const stationModel = require("../models/stations.ts");

/**
 * Stations ROUTE
 * /:
 *   get:
 *     summary: List of stations
 *     description: Render  page
  * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 * 
 * @returns {void}
 */
router.get("/stations", async (req: Request, res: Response) => {
    let allStations = await stationModel.showAllStations();

    res.send(allStations);
});

module.exports = router;
