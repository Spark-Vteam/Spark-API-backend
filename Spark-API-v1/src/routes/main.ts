import { Request, Response, Router } from "express";
const router = Router();
const sitename = " | Spark API Main";

/**
 * Main ROUTE
 * /:
 *   get:
 *     summary: Display
 *     description: Render welcome page
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/", (req: Request, res: Response) => {
    let data = {
        title: `Welcome to the  ${sitename}`,
    };

    res.send(data);
});

module.exports = router;
