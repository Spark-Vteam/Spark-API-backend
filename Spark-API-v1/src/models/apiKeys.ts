import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { Response, NextFunction } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { v4 as uuid } from 'uuid';

const apiKeyModel = {
    /**
     * Function to get a key with a key
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getKeyByKey: async function getKeyByKey(apiKey: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_key_by_key(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [apiKey]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to owner data
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getKeyOwners: async function getKeyOwners(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_key_owners()`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to generate a key for a user
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    createOneApiKey: async function createOneApiKey(apiKeyInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        const apiKey = uuid();
        try {
            const sql = `CALL create_key(?, ?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                apiKeyInfo.emailAdress,
                apiKeyInfo.organization,
                apiKey,
            ]);
            return res.status(200).send({ success: true, msg: `Api key created` });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get a key with a key
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    deleteKeyById: async function deleteKeyByid(id: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL delete_key_by_id(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [id]);

            return res.status(200).send({ success: true, msg: `Key with id ${id} has been deleted` });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
};

export default apiKeyModel;
