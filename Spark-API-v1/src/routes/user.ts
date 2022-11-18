import { Request, Response, Router } from "express";
const router = Router();

import userModel from "../models/user";

/**
 * Users ROUTE
 * /users:
 *   get:
 *     summary: Display list of users
 *     description: Render all users from database
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */

router.get("/user", async (req: Request, res: Response) => {
    let allUsers = await userModel.showAllUsers();

    res.send(allUsers);
});

export default router;
