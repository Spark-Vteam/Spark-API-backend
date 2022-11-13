import { Request, Response, Router } from "express";
const router = Router();
const sitename = " | Main";

/**
 * Main ROUTE
 * /:
 *   get:
 *     summary: Display
 *     description: Render welcome page
 */
router.get("/", (req: Request, res: Response) => {
    let data = {
        title: `Welcome to the  ${sitename}`,
    };

    res.send(data);
});

module.exports = router;
