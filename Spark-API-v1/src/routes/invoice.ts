import { Request, Response, Router } from 'express';

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
router.get('/invoice', async (req: Request, res: Response) => {
    try {
        const allInvoices = await invoiceModel.showAllInvoices();

        const allInvoicesData = JSON.parse(JSON.stringify(allInvoices));
        if (allInvoicesData[0].length === 0) {
            return res.status(404).send('No Invoices currently in the system');
        }
        return res.status(200).send(allInvoices);
    } catch (error) {
        return res.status(404).send(error);
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
router.get('/invoice/:id', async (req: Request, res: Response) => {
    try {
        const oneInvoice = await invoiceModel.getOneInvoice(req.params.id);

        const oneInvoiceData = JSON.parse(JSON.stringify(oneInvoice));
        if (oneInvoiceData[0].length === 0) {
            return res.status(404).send(`No Invoice with id ${req.params.id} in the system`);
        }
        return res.status(200).send(oneInvoice);
    } catch (error) {
        return res.status(404).send(error);
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
router.get('/invoice/user/:id', async (req: Request, res: Response) => {
    try {
        const userInvoices = await invoiceModel.getInvoicesByUserId(req.params.id);

        const userInvoicesData = JSON.parse(JSON.stringify(userInvoices));
        if (userInvoicesData[0].length === 0) {
            return res.status(404).send(`User with id ${req.params.id} currently has no invoices in the system`);
        }
        return res.status(200).send(userInvoices);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.post('/invoice/user/:id', async (req: Request, res: Response) => {
    try {
        const invoiceInfo = {
            rentId: req.body.rentId,
            userId: parseInt(req.params.id),
            amount: req.body.amount,
            status: req.body.status,
        };

        const newInvoice = await invoiceModel.createOneInvoice(
            invoiceInfo.rentId,
            invoiceInfo.userId,
            invoiceInfo.amount,
            invoiceInfo.status
        );

        res.status(201).send(
            `New Invoice has been created with information:\n
                RentId: ${invoiceInfo.rentId},
                UserId: ${invoiceInfo.userId}, 
                Amount: ${invoiceInfo.amount}, 
                Status: ${invoiceInfo.status}`
        );
    } catch (error) {
        return res.status(404).send(error);
    }
});

/**
 * Invoice ROUTE
 * /:
 *   get:
 *     summary: Update invoice status
 *     description: Update an  status invoice
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post('/invoice/status/:id', async (req: Request, res: Response) => {
    try {
        const invoiceId = parseInt(req.params.id);
        const status = req.body.status;

        const newInvoiceStatus = await invoiceModel.updateInvoiceStatus(invoiceId, status);

        res.status(201).send(`Invoice with id ${invoiceId} has changed status to ${status}`);
    } catch (error) {
        return res.status(404).send(error);
    }
});

/**
 * Invoice ROUTE
 * /:
 *   post:
 *     summary: Update invoice amount
 *     description: Update an invoice amount
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post('/invoice/amount/:id', async (req: Request, res: Response) => {
    try {
        const invoiceId = parseInt(req.params.id);
        const amount = req.body.amount;

        const newInvoiceAmount = await invoiceModel.updateInvoiceAmount(invoiceId, amount);

        res.status(201).send(`Invoice with id ${invoiceId} has changed amount to ${amount}`);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
