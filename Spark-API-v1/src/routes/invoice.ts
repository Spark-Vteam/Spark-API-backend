import { Request, Response, Router } from "express";
import invoiceModel from "../models/invoice";
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
router.get("/invoice", async (req: Request, res: Response) => {
    try {
        let allInvoices = await invoiceModel.showAllInvoices();

        let allInvoicesData = JSON.parse(JSON.stringify(allInvoices));
        if (allInvoicesData[0].length === 0) {
            return res.status(404).send("No Invoices currently in the system");
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
router.get("/invoice/:id", async (req: Request, res: Response) => {
    try {
        let oneInvoice = await invoiceModel.getOneInvoice(req.params.id);

        let oneInvoiceData = JSON.parse(JSON.stringify(oneInvoice));
        if (oneInvoiceData[0].length === 0) {
            return res
                .status(404)
                .send(
                    `No Invoice with id ${req.params.id} in the system`
                );
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
router.get("/invoice/user/:id", async (req: Request, res: Response) => {
    try {
        let userInvoices = await invoiceModel.getInvoicesByUserId(
            req.params.id
        );

        let userInvoicesData = JSON.parse(JSON.stringify(userInvoices));
        if (userInvoicesData[0].length === 0) {
            return res
                .status(404)
                .send(
                    `User with id ${req.params.id} currently has no invoices in the system`
                );
        }
        return res.status(200).send(userInvoices);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
