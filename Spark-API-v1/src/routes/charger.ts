import { Request, Response, Router } from "express";
import chargerModel from "../models/chargers";
const router = Router();

/**
 * Charger ROUTE
 * /:
 *   get:
 *     summary: Display all chargers
 *     description: Render list of all chargers
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/charger", async (req: Request, res: Response) => {
    try {
        let allChargers = await chargerModel.showAllChargers();
        return res.status(200).send(allChargers);
    } catch (error) {
        return res.status(404).send(error);
    }
});

/**
 * Charger ROUTE
 * /:
 *   get:
 *     summary: Display information for one charger
 *     description: Render a specific charger
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/charger/:id", async (req: Request, res: Response) => {
    try {
        let oneCharger = await chargerModel.getOneCharger(req.params.id);
        return res.status(200).send(oneCharger);
    } catch (error) {
        return res.status(404).send(error);
    }
});

/**
 * Charger ROUTE
 * /:
 *   post:
 *     summary: Change status of one charger
 *     description: Update a status for one charger
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post("/charger/:id", async (req: Request, res: Response) => {
    try {
        const chargerID = req.params.id;
        let status = req.body.status;

        let newStatus = await chargerModel.updateStatus(chargerID, status);
        return res
            .status(200)
            .send(
                `Charger with id ${req.params.id} has changed status to ${status} `
            );
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
