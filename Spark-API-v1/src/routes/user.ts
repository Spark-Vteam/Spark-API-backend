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

/**
 * User ROUTE
 *  /user/:id:
 *   get:
 *     summary: One User
 *     description: Render User by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/user/:id", async (req: Request, res: Response) => {
    let oneUser = await userModel.getOneUser(req.params.id);

    res.send(oneUser);
});

export default router;
