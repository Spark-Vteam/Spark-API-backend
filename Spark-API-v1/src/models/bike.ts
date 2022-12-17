import database from '../db/db';
import { Response, NextFunction } from 'express';

const bikeModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllBikes: async function showAllBikes(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_bikes();`;

            const res = await db.query(sql);

            return res[0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    getOneBike: async function getOneBike(bikeId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_bike(?)`;

            const res = await db.query(sql, [bikeId]);
            return res[0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    updateOneBike: async function updateOneBike(
        bikeId: number,
        position: string,
        battery: number,
        status: number,
        speed: number
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_bike(?, ?, ?, ?, ?)`;
            const res = await db.query(sql, [bikeId, position, battery, status, speed]);
            return res[0];
        } finally {
            await db.end();
        }
    },
};

export default bikeModel;
