import database from '../db/db';
import { Response, NextFunction } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

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

            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get bikes within a radius
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getBikeRadius: async function getBikeRadius(radiusInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_bikes_in_radius(?,?,?)`;

            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                radiusInfo.longitude,
                radiusInfo.latitude,
                radiusInfo.radius,
            ]);
            return res[0][0];
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

            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [bikeId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    updateOneBike: async function updateOneBike(bikeInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_bike(?, ?, ?, ?, ?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                bikeInfo.bikeId,
                bikeInfo.position,
                bikeInfo.battery,
                bikeInfo.status,
                bikeInfo.speed,
            ]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
};

export default bikeModel;
