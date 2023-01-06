import { Response, NextFunction } from 'express';
import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { CustomError } from '../middleware/errorHandler';

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
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get one invoice
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneInvoice: async function getOneInvoice(invoiceId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_invoice(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [invoiceId]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
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
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
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

            if (!invoiceInfo.amount || !invoiceInfo.status) {
                throw new CustomError(false, 'Missing Credentials');
            }

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                invoiceInfo.rentId,
                invoiceInfo.userId,
                invoiceInfo.amount,
                invoiceInfo.status,
            ]);

            return res.status(201).send({
                success: true,
                msg: `New Invoice has been created for user: ${invoiceInfo.userId}`,
            });
        } catch (error: any) {
            next(error);
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

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                invoiceInfo.invoiceId,
                invoiceInfo.status,
            ]);

            return res.status(201).send({
                success: true,
                msg: `Invoice with id ${invoiceInfo.invoiceId} has changed status to ${invoiceInfo.status}`,
            });
        } catch (error: any) {
            next(error);
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

            if (!invoiceInfo.amount) {
                next(new CustomError(false, 'No amount was added'));
            }

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                invoiceInfo.invoiceId,
                invoiceInfo.amount,
            ]);

            return res.status(201).send({
                success: true,
                msg: `Invoice with id ${invoiceInfo.invoiceId} has changed amount to ${invoiceInfo.amount}`,
            });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to pay one invoice
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    payOneInvoice: async function payOneInvoice(invoiceInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL pay_invoice(?, ?)`;

            if (!invoiceInfo.userId) {
                throw new CustomError(false, 'Missing userID');
            }

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [invoiceInfo.id, invoiceInfo.userId]);

            return res.status(201).send({
                success: true,
                msg: `Invoice with id ${invoiceInfo.id} has been paid`,
            });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to pay monthly invoice
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    payMonthlyInvoice: async function payMonthlyInvoice(
        userId: string,
        expireDate: string,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL pay_monthly_invoice(?, ?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, expireDate]);

            if (!expireDate) {
                throw new CustomError(false, 'No date was given');
            }

            console.log('AFFECTED ROWS');
            console.log(dbRes);

            return res.status(200).send({
                success: true,
                data: { dbRes },
                // msg: `Monthly invoice for user with id ${userId} has been paid`,
            });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
};

export default invoiceModel;
