import { NextFunction, Request, Response, Router } from 'express';

import apiKeyModel from '../../../models/apiKeys';
const router = Router();

interface apiKeyInfo {
    email: string;
    organization: string;
    apiKey: string;
}

/**
 * apiKey ROUTE
 * /api_key:
 *   post:
 *     summary: Create a ApiKey for a user
 *     description: Create an ApiKey for a user
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post('/apiKey', async (req: Request, res: Response, next: NextFunction) => {
    const apiKeyInfo = {
        emailAdress: req.body.emailAdress,
        organization: req.body.organization,
    };

    try {
        return await apiKeyModel.createOneApiKey(apiKeyInfo, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * apiKey ROUTE
 * /api_key/owner:
 *   get:
 *     summary: Get all keys owner data
 *     description: Render key owner data from database
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/apiKey/owner', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await apiKeyModel.getKeyOwners(res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * apiKey ROUTE
 * /api_key/:id:
 *   delete:
 *     summary: Delete one key by id
 *     description: Render confirmation msg
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.delete('/apiKey/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        return await apiKeyModel.deleteKeyById(id, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
