import { Request, Response, Router, NextFunction } from 'express';
import PricingInfo from 'src/interfaces/pricingInfo';
import pricingModel from '../models/pricing';
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
    const allPricings = await pricingModel.showAllPricings(res, next);

    return res.status(200).send({ success: true, data: allPricings });
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
    const pricingInfo: PricingInfo = {
        type: req.body.type,
        description: req.body.description,
        start: req.body.start,
        minute: req.body.minute,
        parking: req.body.parking,
        discountStartFee: req.body.discountStartFee,
        discountEndParkingZone: req.body.discountEndParkingZone,
        discountEndCharging: req.body.discountEndCharging,
    };

    await pricingModel.createOnePricing(pricingInfo, res, next);

    return res.status(200).send({ success: true, msg: `Pricing has been created` });
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
    const pricingInfo = {
        type: req.body.type,
        description: req.body.description,
        start: req.body.start,
        minute: req.body.minute,
        parking: req.body.parking,
        discountStartFee: req.body.discountStartFee,
        discountEndParkingZone: req.body.discountEndParkingZone,
        discountEndCharging: req.body.discountEndCharging,
    };

    console.log(pricingId, pricingInfo);

    await pricingModel.updateOnePricing(pricingId, pricingInfo, res, next);

    return res.status(200).send({ success: true, msg: `Pricing has been updated` });
});

export default router;
