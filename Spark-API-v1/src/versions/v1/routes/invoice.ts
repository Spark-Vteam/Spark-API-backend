import { NextFunction, Request, Response, Router } from 'express';

import invoiceModel from '../../../models/invoice';
const router = Router();

/**
 * Invoice ROUTE
 * /:
 *   get:
 *     summary: Display all Invoices
 *     description: Render list of invoices
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/invoice', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await invoiceModel.showAllInvoices(res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Invoice ROUTE
 * /:
 *   get:
 *     summary: Display information for one invoice
 *     description: Render a specific invoice
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/invoice/:id', async (req: Request, res: Response, next: NextFunction) => {
    const invoiceId = req.params.id;

    try {
        return await invoiceModel.getOneInvoice(invoiceId, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Invoice ROUTE
 * /:
 *   get:
 *     summary: Display all invoices for a user
 *     description: Render all invoices for a user
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/invoice/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);

    try {
        return await invoiceModel.getInvoicesByUserId(userId, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Invoice ROUTE
 * /:
 *   get:
 *     summary: Create a invoice for a user
 *     description: Create a invoice for a user
 *     with information
 *     { Rent_id, User_id, PhoneNumber, Amount, Status }
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post('/invoice/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    const invoiceInfo = {
        rentId: req.body.rentId,
        userId: req.params.id,
        amount: req.body.amount,
        status: req.body.status,
    };

    try {
        return await invoiceModel.createOneInvoice(invoiceInfo, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Invoice ROUTE
 * /:
 *   put:
 *     summary: Update invoice status
 *     description: Update an  status invoice
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/invoice/status/:id', async (req: Request, res: Response, next: NextFunction) => {
    const invoiceInfo = {
        invoiceId: req.params.id,
        status: req.body.status,
    };

    try {
        return await invoiceModel.updateInvoiceStatus(invoiceInfo, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Invoice ROUTE
 * /:
 *   put:
 *     summary: Update invoice amount
 *     description: Update an invoice amount
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/invoice/amount/:id', async (req: Request, res: Response, next: NextFunction) => {
    const invoiceInfo = {
        invoiceId: req.params.id,
        amount: req.body.amount,
    };

    try {
        return await invoiceModel.updateInvoiceAmount(invoiceInfo, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Invoice ROUTE
 * /:
 *   put:
 *     summary: Pay an invoice
 *     description: Pay an invoice
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/invoice/pay/:id', async (req: Request, res: Response, next: NextFunction) => {
    const invoiceInfo = {
        id: req.params.id,
        userId: req.body.userId,
        method: req.body.method,
    };

    try {
        return await invoiceModel.payOneInvoice(invoiceInfo, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * Invoice ROUTE
 * /:
 *   put:
 *     summary: Pay monthly invoice
 *     description: Pay monthly invoice
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/invoice/pay_monthly/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const method = req.body.method;
    const expireDate = req.body.expires;

    try {
        return await invoiceModel.payMonthlyInvoice(userId, method, expireDate, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
