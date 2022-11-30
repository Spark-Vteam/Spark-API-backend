import { Request, Response, Router } from "express";
import geofenceModel from "../models/geofence";
const router = Router();
const sitename = " | Spark API Main";

/**
 * Geofence ROUTE
 * /:
 *   get:
 *     summary: Display all geofences
 *     description: Render list of all geofences
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/geofence", async (req: Request, res: Response) => {
    let allGeofences = await geofenceModel.showAllGeofences();
    let allGeofencesData = JSON.parse(JSON.stringify(allGeofences));
    if (allGeofencesData[0].length === 0) {
        return res.status(404).send("No geofences currently in the system");
    }
    return res.status(200).send(allGeofences);
});

/**
 * Geofence ROUTE
 * /:
 *   get:
 *     summary: Display information for one geofence
 *     description: Render a specific geofence
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/geofence/:id", async (req: Request, res: Response) => {
    let oneGeofence = await geofenceModel.getOneGeofence(req.params.id);

    let oneGeofenceData = JSON.parse(JSON.stringify(oneGeofence));
    if (oneGeofenceData[0].length === 0) {
        return res
            .status(404)
            .send(`No geofence with id ${req.params.id} in the system`);
    }
    return res.status(200).send(oneGeofence);
});

export default router;
