import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { Response, NextFunction } from 'express';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const creditCardModel = {
    /**
     * Function to save a credit card in the database
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    saveCreditCard: async function saveCreditCard(
        userId: string,
        creditCardInfo: any,
        res: Response,
        next: NextFunction
    ) {
        bcrypt.hash(creditCardInfo.pan, saltRounds, async function (error: any, hash: any) {
            const db = await database.getDb();
            creditCardInfo.truncpan = creditCardInfo.pan.substr(creditCardInfo.pan.length - 4);
            try {
                creditCardInfo.pan = hash;
                creditCardInfo.firstname = hash;
                creditCardInfo.lastname = hash;

                const sql_user = `CALL create_creditcard(?, ?, ?, ?, ?, ?)`;
                const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql_user, [
                    userId,
                    creditCardInfo.pan,
                    creditCardInfo.expiry,
                    creditCardInfo.firstname,
                    creditCardInfo.lastname,
                    creditCardInfo.truncpan,
                ]);
                return res.status(200).send({ success: true, msg: creditCardInfo });
            } catch (error: any) {
                next(error);
            } finally {
                await db.end();
            }
        });
    },
};

export default creditCardModel;
