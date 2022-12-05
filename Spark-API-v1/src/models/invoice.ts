import mysql from 'mysql2/promise';

import config from '../config';

let db: mysql.Connection;
/**
 * Main function to connect to database.
 * @async
 * @returns void
 */
(async function () {
    db = await mysql.createConnection({
        host: config.DB_HOST,
        user: config.DB_USER,
        database: config.DB_NAME,
        password: config.DB_PASSWORD,
    });

    process.on('exit', () => {
        db.end();
    });
})();

const invoiceModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllInvoices: async function showAllInvoices() {
        const sql = `CALL get_invoices();`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneInvoice: async function getOneInvoice(invoiceId: string) {
        const sql = `CALL get_invoice(?)`;
        let res;

        res = await db.query(sql, [invoiceId]);
        return res[0];
    },
    getInvoicesByUserId: async function getOneInvoice(userId: string) {
        const sql = `CALL get_invoices_by_user(?)`;
        let res;

        res = await db.query(sql, [userId]);
        return res[0];
    },
    createOneInvoice: async function createOneInvoice(rentId: number, userId: number, amount: number, status: number) {
        const sql = `CALL create_invoice(?, ?, ?, ?)`;
        let res;

        res = await db.query(sql, [rentId, userId, amount, status]);
        return res[0];
    },
    updateInvoiceStatus: async function updateInvoiceStatus(invoiceId: number, status: number) {
        const sql = `CALL update_invoice_status(?, ?)`;
        let res;

        res = await db.query(sql, [invoiceId, status]);
        return res[0];
    },
    updateInvoiceAmount: async function updateInvoiceAmount(invoiceId: number, amount: number) {
        const sql = `CALL update_invoice_amount(?, ?)`;
        let res;

        res = await db.query(sql, [invoiceId, amount]);
        return res[0];
    },
};

export default invoiceModel;
