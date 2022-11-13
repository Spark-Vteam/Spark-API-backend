import { Request, Response, Router } from "express";
const router = Router();
const sitename = "Users";

const users = require("../models/users.ts");

/**
 * Users ROUTE
 * /users:
 *   get:
 *     summary: Display list of users
 *     description: Render users page
 */
router.get("/users", async (req: Request, res: Response) => {
    let allUsers = await users.showAllUsers();

    res.send(allUsers);
});

module.exports = router;
