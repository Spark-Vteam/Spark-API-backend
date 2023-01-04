import { NextFunction, Request, Response, Router } from 'express';

import apiKeyModel from '../../../models/apiKeys';
const router = Router();

interface apiKeyInfo {}

/**
 * apiKey ROUTE
 * /api_key:
 *   get:
 *     summary: Display list of users with apiKeys
 *     description: Render all users with apiKeys from database
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/apiKey', async (req: Request, res: Response, next: NextFunction) => {
    res.send('users with apiKeys');
});

module.exports = router;
