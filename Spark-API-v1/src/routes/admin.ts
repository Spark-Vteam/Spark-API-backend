import { Request, Response, Router } from "express";
import adminModel from "../models/admin";
const router = Router();
const sitename = " Admin | Spark API Main";

/**
 * Admin ROUTE
 * /:
 *   get:
 *     summary: Display all admins
 *     description: Render admin list
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/admin", async (req: Request, res: Response) => {
    let allAdmins = await adminModel.showAllAdmins();

    let allAdminsData = JSON.parse(JSON.stringify(allAdmins));
    if (allAdminsData[0].length === 0) {
        return res.status(404).send("No admins currently in the system");
    }
    return res.status(200).send(allAdmins);
});

/**
 * Admin ROUTE
 *  /admin/:id:
 *   get:
 *     summary: One admin
 *     description: Render admin by adminId
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.get("/admin/:id", async (req: Request, res: Response) => {
    let oneAdmin = await adminModel.getOneAdmin(req.params.id);
    let oneAdminData = JSON.parse(JSON.stringify(oneAdmin));
    if (oneAdminData[0].length === 0) {
        return res.status(404).send("No admin for that admin Id was found");
    }
    return res.status(200).send(oneAdmin);
});

export default router;
