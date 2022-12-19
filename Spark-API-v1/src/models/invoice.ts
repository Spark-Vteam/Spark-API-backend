import { Response, NextFunction } from 'express';
import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

const invoiceModel = {
    /**
     * Function to show all invoices
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllInvoices: async function showAllInvoices(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_invoices();`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get one invoice
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneInvoice: async function getOneInvoice(invoiceId: number, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_invoice(?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [invoiceId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get one invoice by user id
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getInvoicesByUserId: async function getInvoicesByUserId(userId: number, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_invoices_by_user(?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to create one invoice
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    createOneInvoice: async function createOneInvoice(invoiceInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL create_invoice(?, ?, ?, ?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                invoiceInfo.rentId,
                invoiceInfo.userId,
                invoiceInfo.amount,
                invoiceInfo.status,
            ]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update status of one invoice
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateInvoiceStatus: async function updateInvoiceStatus(invoiceInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_invoice_status(?, ?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                invoiceInfo.invoiceId,
                invoiceInfo.status,
            ]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update amount of one invoice
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateInvoiceAmount: async function updateInvoiceAmount(invoiceInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_invoice_amount(?, ?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                invoiceInfo.invoiceId,
                invoiceInfo.amount,
            ]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
};

export default invoiceModel;
