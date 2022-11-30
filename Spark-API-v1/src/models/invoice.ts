import mysql from "mysql2/promise";
import config from "../config";

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

    process.on("exit", () => {
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
        let sql = `CALL get_invoices();`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneInvoice: async function getOneInvoice(invoiceId: string) {
        let sql = `CALL get_invoice(?)`;
        let res;

        res = await db.query(sql, [invoiceId]);
        return res[0];
    },
    getInvoicesByUserId: async function getOneInvoice(userId: string) {
        let sql = `CALL get_invoices_by_user(?)`;
        let res;

        res = await db.query(sql, [userId]);
        return res[0];
    },
};

export default invoiceModel;
