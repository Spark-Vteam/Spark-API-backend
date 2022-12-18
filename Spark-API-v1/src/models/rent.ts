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

            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
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

            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [rentId]);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to show all active rents for one User
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getBikeLogs: async function getBikeLogs(rentId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_bikeslog_from_rent(?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [rentId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, bikeId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [rentId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
};

export default rentModel;
