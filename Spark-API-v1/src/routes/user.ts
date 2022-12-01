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
    try {
        let allUsers = await userModel.showAllUsers();

        let allUsersData = JSON.parse(JSON.stringify(allUsers));
        if (allUsersData[0].length === 0) {
            return res.status(404).send("No users currently in the system");
        }
        return res.status(200).send(allUsers);
    } catch (error) {
        return res.status(404).send(error);
    }
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
    try {
        let oneUser = await userModel.getOneUser(req.params.id);

        res.status(200).send(oneUser);
    } catch (error) {
        res.status(404).send(error);
    }
});

export default router;
