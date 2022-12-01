import { Request, Response, Router } from "express";
const router = Router();

import rentModel from "../models/rent";

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
router.get("/rent", async (req: Request, res: Response) => {
    try {
        let allRents = await rentModel.showAllRents();
        let allRentsData = JSON.parse(JSON.stringify(allRents));
        if (allRentsData[0].length === 0) {
            return res.status(404).send("No rents currently in the system");
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
router.get("/rent/:id", async (req: Request, res: Response) => {
    try {
        let oneRent = await rentModel.getOneRent(req.params.id);
        let oneRentData = JSON.parse(JSON.stringify(oneRent));
        if (oneRentData[0].length === 0) {
            return res
                .status(404)
                .send(`No rent with Id ${req.params.id} was found`);
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
router.get("/rent/user/:id", async (req: Request, res: Response) => {
    try {
        let rentByUserId = await rentModel.getRentsByUserId(req.params.id);

        let rentByUserIdData = JSON.parse(JSON.stringify(rentByUserId));

        if (rentByUserIdData[0].length === 0) {
            return res
                .status(404)
                .send(`No rents for user Id ${req.params.id} was found`);
        }
        return res.status(200).send(rentByUserId);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
