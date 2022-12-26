import { NextFunction, Response } from 'express';
import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

const stationModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllStations: async function showAllStations(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_stations();`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to show one station
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneStation: async function getOneStation(stationId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_station(?)`;

            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [stationId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
};

export default stationModel;
