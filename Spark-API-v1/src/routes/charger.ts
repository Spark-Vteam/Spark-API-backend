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
    let allChargers = await chargerModel.showAllChargers();
    let allChargersData = JSON.parse(JSON.stringify(allChargers));
    if (allChargersData[0].length === 0) {
        return res.status(404).send("No chargers currently in the system");
    }

    return res.status(200).send(allChargers);
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
    // DB has 1000 chargers atm
    // but if changed 
    // Find better way to render Error msg
    if (parseInt(req.params.id) > 1000) {
        return res
            .status(404)
            .send(`No Charger with id ${req.params.id} in the system`);
    }
    let oneCharger = await chargerModel.getOneCharger(req.params.id);

    let oneChargerData = JSON.parse(JSON.stringify(oneCharger));

    console.log(oneChargerData);

    return res.status(200).send(oneCharger);
});

export default router;
