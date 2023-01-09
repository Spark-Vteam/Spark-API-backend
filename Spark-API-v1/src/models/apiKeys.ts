import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

import { CustomError } from '../middleware/errorHandler';
import database from '../db/db';

const apiKeyModel = {
    /**
     *
     * Function to that an APIKey is valid
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    checkAPIKey: async function checkAPIKey(req: Request, res: Response, next: NextFunction) {
        console.log('Check API_Key');

        const apiKey = '67d077df-124d-4086-8b4b-4f0385d7f2ef';
        const keyInDb: any = await apiKeyModel.getKeyByKey(apiKey, res, next);
        console.log('keyInDb');
        console.log(keyInDb);

        if (keyInDb[0].hasOwnProperty('Email')) {
            return next();
        }
        return res.status(401).json({
            errors: {
                status: 401,
                msg: 'Invalid API Key',
            },
        });
    },
    /**
     * Function to get a key with a key
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getKeyByKey: async function getKeyByKey(apiKey: string, res: Response, next: NextFunction) {
        const db = await database.getDb();

        try {
            console.log('getKeyByKey');
            console.log(apiKey);

            const sql = `CALL get_key_by_key(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [apiKey]);
            console.log('dbRes');
            console.log(dbRes[0][0].length);

            if (dbRes[0][0].length == 0) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        msg: 'No API Key found in database',
                    },
                });
            }
            return dbRes[0][0];
            // return res.status(200).send({ success: true, data: dbRes[0][0] });
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
            return res
                .status(200)
                .send({ success: true, msg: `Api key created ${apiKey} for ${apiKeyInfo.emailAdress}` });
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
