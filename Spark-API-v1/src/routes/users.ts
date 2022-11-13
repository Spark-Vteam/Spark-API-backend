import { Request, Response, Router } from 'express';
const router = Router();
const sitename = " | Users";

/**
 * Users ROUTE
 * /users:
 *   get:
 *     summary: Display list of users
 *     description: Render users page
 */
router.get("/users", (req: Request, res: Response) => {
    let data = {
        title: `Välkommen  ${sitename}`,
    };

    res.send(data);
});

module.exports = router;
