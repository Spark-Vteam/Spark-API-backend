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

const userModel = {
    /**
     * Function to show all users
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllUsers: async function showAllUsers() {
        const sql = `CALL get_users();`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneUser: async function getOneUser(userId: string) {
        const sql = `CALL get_user(?)`;
        let res;

        res = await db.query(sql, [userId]);
        return res[0];
    },
    updateUserFirstName: async function updateUserFirstName(userId: string, firstName: string) {
        const sql = `CALL update_user_firstname(?, ?)`;
        let res;

        res = await db.query(sql, [userId, firstName]);

        return res[0];
    },
    updateUserLastName: async function updateUserLastName(userId: string, lastName: string) {
        const sql = `CALL update_user_lastname(?, ?)`;
        let res;

        res = await db.query(sql, [userId, lastName]);

        return res[0];
    },
    updateUserPhoneNumber: async function updateUserPhoneNumber(userId: string, phoneNumber: string) {
        const sql = `CALL update_user_phonenumber(?, ?)`;
        let res;

        res = await db.query(sql, [userId, phoneNumber]);

        return res[0];
    },
    updateUserEmailAdress: async function updateUserEmailAdress(userId: string, emailAdress: string) {
        const sql = `CALL update_user_emailadress(?, ?)`;
        let res;

        res = await db.query(sql, [userId, emailAdress]);

        return res[0];
    },
    updateUserBalance: async function updateUserBalance(userId: string, balance: number) {
        const sql = `CALL update_user_balance(?, ?)`;
        let res;

        res = await db.query(sql, [userId, balance]);

        return res[0];
    },
    deleteOneUser: async function deleteOneUser(userId: string) {
        const sql = `CALL delete_user(?)`;
        let res;

        res = await db.query(sql, [userId]);
        return res[0];
    },
};

export default userModel;
