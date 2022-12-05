import { stat } from 'fs';
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

const bikeModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllBikes: async function showAllBikes() {
        const sql = `CALL get_bikes();`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneBike: async function getOneBike(bikeId: string) {
        const sql = `CALL get_bike(?)`;
        let res;

        res = await db.query(sql, [bikeId]);
        return res[0];
    },
    updateOneBike: async function updateOneBike(
        bikeId: number,
        position: string,
        battery: number,
        status: number,
        speed: number
    ) {
        const sql = `CALL update_bike(?, ?, ?, ?, ?)`;
        let res;

        res = await db.query(sql, [bikeId, position, battery, status, speed]);
        return res[0];
    },
};

export default bikeModel;
