import database from '../db/db';

const invoiceModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllInvoices: async function showAllInvoices() {
        const db = await database.getDb();
        try {
            const sql = `CALL get_invoices();`;
            const res = await db.query(sql);

            return res[0];
        } finally {
            await db.end();
        }
    },
    getOneInvoice: async function getOneInvoice(invoiceId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_invoice(?)`;
            const res = await db.query(sql, [invoiceId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    getInvoicesByUserId: async function getOneInvoice(userId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_invoices_by_user(?)`;
            const res = await db.query(sql, [userId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    createOneInvoice: async function createOneInvoice(rentId: number, userId: number, amount: number, status: number) {
        const db = await database.getDb();
        try {
            const sql = `CALL create_invoice(?, ?, ?, ?)`;
            const res = await db.query(sql, [rentId, userId, amount, status]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    updateInvoiceStatus: async function updateInvoiceStatus(invoiceId: number, status: number) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_invoice_status(?, ?)`;
            const res = await db.query(sql, [invoiceId, status]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    updateInvoiceAmount: async function updateInvoiceAmount(invoiceId: number, amount: number) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_invoice_amount(?, ?)`;
            const res = await db.query(sql, [invoiceId, amount]);
            return res[0];
        } finally {
            await db.end();
        }
    },
};

export default invoiceModel;
