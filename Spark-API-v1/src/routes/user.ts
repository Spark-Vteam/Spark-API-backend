import { Request, Response, Router } from "express";
import { userInfo } from "os";
const router = Router();

import userModel from "../models/user";

interface UserInfo {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    EmailAdress: string;
    Balance: number;
    Password: string;
}

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

/**
 * User ROUTE
 *  /user/:id:
 *   get:
 *     summary: Update One User
 *     description: Update User by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post("/user/:id", async (req: Request, res: Response) => {
    const result = req.body;
    res.status(201).send({data: result});
});

/**
 * User ROUTE
 *  /user/:id:
 *   get:
 *     summary: Delete One User
 *     description: Delete User by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.delete("/user/:id", async (req: Request, res: Response) => {
    try {
        let deletedUser = await userModel.deleteOneUser(req.params.id);
        let deletedUserData = JSON.parse(JSON.stringify(deletedUser));
        res.status(204).send(`User with id ${deletedUserData.id} was deleted`);
    } catch (error) {
        res.status(404).send(error);
    }
});

export default router;
