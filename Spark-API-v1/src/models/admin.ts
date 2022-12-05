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

const adminModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllAdmins: async function showAllAdmins() {
        const sql = `CALL get_admins();`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneAdmin: async function getOneAdmin(adminId: string) {
        const sql = `CALL get_admin(?)`;
        let res;

        res = await db.query(sql, [adminId]);
        return res[0];
    },
    createOneAdmin: async function createOneAdmin(
        firstName: string,
        lastName: string,
        phoneNumber: number,
        emailAdress: string,
        authority: number,
        password: string
    ) {
        const sql = `CALL create_admin(?, ?, ?, ?, ?, ?)`;
        let res;

        res = await db.query(sql, [firstName, lastName, phoneNumber, emailAdress, authority, password]);
        return res[0];
    },
};

export default adminModel;
