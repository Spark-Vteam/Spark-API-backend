import { Request, Response, Router } from "express";
const router = Router();
const sitename = "Users";

const users = require("../models/users.ts");

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

router.get("/users", async (req: Request, res: Response) => {
    let allUsers = await users.showAllUsers();

    res.send(allUsers);
});

module.exports = router;
