import { NextFunction, Request, Response, Router } from 'express';

import invoiceModel from '../models/invoice';
const router = Router();

interface InvoiceInfo {
    RentId: number;
    UserId: number;
    Amount: number;
    Status: number;
}

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
    const allInvoices = await invoiceModel.showAllInvoices(res, next);

    return res.status(200).send({ success: true, data: allInvoices });
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
    const invoiceId = parseInt(req.params.id);
    const oneInvoice = await invoiceModel.getOneInvoice(invoiceId, res, next);

    return res.status(200).send({ success: true, data: oneInvoice });
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

    const userInvoices = await invoiceModel.getInvoicesByUserId(userId, res, next);

    return res.status(200).send({ success: true, data: userInvoices });
});

/**
 * Invoice ROUTE
 * /:
 *   get:
 *     summary: Create a invoice for a user
 *     description: Create a invoice for a user with information
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
    console.log('/route');
    console.log(invoiceInfo);

    await invoiceModel.createOneInvoice(invoiceInfo, res, next);

    res.status(201).send({
        success: true,
        msg: `New Invoice has been created with information for user: ${invoiceInfo.userId}`,
    });
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

    await invoiceModel.updateInvoiceStatus(invoiceInfo, res, next);

    res.status(201).send({
        success: true,
        msg: `Invoice with id ${invoiceInfo.invoiceId} has changed status to ${invoiceInfo.status}`,
    });
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

    await invoiceModel.updateInvoiceAmount(invoiceInfo, res, next);

    res.status(201).send({
        success: true,
        msg: `Invoice with id ${invoiceInfo.invoiceId} has changed amount to ${invoiceInfo.amount}`,
    });
});

export default router;
