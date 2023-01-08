import { NextFunction, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

import database from '../db/db';
import { CustomError } from '../middleware/errorHandler';

const chargerModel = {
    /**
     * Function to show all chargers
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllChargers: async function showAllChargers(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_chargers();`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get one charger
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneCharger: async function getOneCharger(chargerId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();

        try {
            const sql = `CALL get_charger(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [chargerId]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update status of one charger
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateStatus: async function updateStatus(chargerInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            if (!chargerInfo.status) {
                throw new CustomError(false, 'No status given');
            }
            const sql = `CALL update_charger_status(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [chargerInfo.id, chargerInfo.status]);

            return res.status(200).send({
                success: true,
                msg: `Charger with id ${chargerInfo.id} has changed status to ${chargerInfo.status} `,
            });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
};

export default chargerModel;
