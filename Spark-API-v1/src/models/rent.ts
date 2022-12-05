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

const rentModel = {
    showAllRents: async function showAllRents() {
        const sql = `CALL get_rents()`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneRent: async function getOneRent(rentId: string) {
        const sql = `CALL get_rent(?)`;
        let res;

        res = await db.query(sql, [rentId]);
        return res[0];
    },
    getRentsByUserId: async function getRentsByUserId(userId: string) {
        const sql = `CALL get_rents_by_user(?)`;
        let res;

        res = await db.query(sql, [userId]);
        return res[0];
    },
    createOneRent: async function createOneRent(userId: string, bikeId: string) {
        const sql = `CALL create_rent(?, ?)`;
        let res;

        res = await db.query(sql, [userId, bikeId]);
        return res[0];
    },
    updateOneRent: async function createOneRent(rentId: string) {
        const sql = `CALL update_rent(?)`;
        let res;

        res = await db.query(sql, [rentId]);
        return res[0];
    },
};

export default rentModel;
