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
    try {
        let allStations = await stationModel.showAllStations();
        let allStationsData = JSON.parse(JSON.stringify(allStations));
        if (allStationsData[0].length === 0) {
            return res.status(404).send("No stations currently in the system");
        }
        return res.send(allStations);
    } catch (error) {
        return res.status(404).send(error);
    }
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
    try {
        let oneStation = await stationModel.getOneStation(req.params.id);
        let oneStationData = JSON.parse(JSON.stringify(oneStation));
        if (oneStationData[0].length === 0) {
            return res
                .status(404)
                .send(`No station with Id ${req.params.id} was found`);
        }
        return res.send(oneStation);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
