import { NextFunction, Response } from 'express';
import database from '../api/v1/db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

const adminModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllAdmins: async function showAllAdmins(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_admins();`;

            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get one station
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneAdmin: async function getOneAdmin(adminId: number, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_admin(?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [adminId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    createOneAdmin: async function createOneAdmin(adminInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL create_admin(?, ?, ?, ?, ?, ?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                adminInfo.firstName,
                adminInfo.lastName,
                adminInfo.phoneNumber,
                adminInfo.emailAdress,
                adminInfo.authority,
                adminInfo.password,
            ]);
            return res[0];
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
};

export default adminModel;
