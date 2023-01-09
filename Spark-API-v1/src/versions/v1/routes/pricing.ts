import { Request, Response, Router, NextFunction } from 'express';

import PricingInfo from 'src/interfaces/pricingInfo';
import pricingModel from '../../../models/pricing';
const router = Router();

/**
 * Pricing ROUTE
 * /:
 *   get:
 *     summary: Display all pricings
 *     description: Render pricing table
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/pricing', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await pricingModel.showAllPricings(res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Pricing ROUTE
 *  /pricing:
 *   post:
 *     summary: Create a new pricing
 *     description: Create one pricing
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.post('/pricing', async (req: Request, res: Response, next: NextFunction) => {
    const pricingInfo: PricingInfo = req.body;

    try {
        return await pricingModel.createOnePricing(pricingInfo, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Pricing ROUTE
 *  /pricing:
 *   put:
 *     summary: Update a pricing
 *     description: Update one pricing
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.put('/pricing/:id', async (req: Request, res: Response, next: NextFunction) => {
    const pricingId = req.params.id;
    const pricingInfo = req.body;

    try {
        return await pricingModel.updateOnePricing(pricingId, pricingInfo, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
