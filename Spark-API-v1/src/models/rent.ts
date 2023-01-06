import database from '../db/db';
import { NextFunction, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

const rentModel = {
    /**
     * Function to show all rents
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllRents: async function showAllRents(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_rents()`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to show one rent
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneRent: async function getOneRent(rentId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_rent(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [rentId]);
            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to show all active rents for one User
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getActiveRents: async function getActiveRents(userId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_active_rents_by_user(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to show all rents for one User
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getRentsByUserId: async function getRentsByUserId(userId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_rents_by_user(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to show bikesLogs
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getBikeLogs: async function getBikeLogs(rentId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_bikeslog_from_rent(?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [rentId]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to create one rent
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    createOneRent: async function createOneRent(userId: string, bikeId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL create_rent(?, ?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, bikeId]);

            return res.status(200).send({ success: true, msg: `New rent created for user ${userId}` });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update one rent
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateOneRent: async function createOneRent(rentId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_rent(?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [rentId]);

            return res.status(200).send({ success: true, msg: `Rent with id ${rentId} has been updated` });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
};

export default rentModel;
