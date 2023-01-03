import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { Response, NextFunction } from 'express';
import { CustomError } from '../middleware/errorHandler';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userModel = {
    /**
     * Function to show all users
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllUsers: async function showAllUsers(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_users();`;
            const allUsers: [RowDataPacket[], FieldPacket[]] = await db.query(sql);
            return res.status(200).send({ success: true, data: allUsers[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to show one user
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneUser: async function getOneUser(userId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_user(?)`;
            const oneUser: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);
            return res.status(200).send({ success: true, data: oneUser[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to create a user
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    createOneUser: async function createOneUser(userInfo: any, res: Response, next: NextFunction) {
        bcrypt.hash(userInfo.password, saltRounds, async function (error: any, hash: any) {
            const db = await database.getDb();
            try {
                userInfo.password = hash;

                const sql = `CALL create_user(?, ?, ?, ?, ?,?)`;
                const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                    userInfo.firstName,
                    userInfo.lastName,
                    userInfo.phoneNumber,
                    userInfo.emailAdress,
                    userInfo.password,
                    userInfo.oauth,
                ]);

                return res.status(200).send({ success: true, msg: 'New user added to the database' });
            } catch (error: any) {
                next(error);
            } finally {
                await db.end();
            }
        });
    },
    /**
     * Function to update a users firstname
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateUserFirstName: async function updateUserFirstName(
        userId: string,
        firstName: string,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_firstname(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, firstName]);
            const resultSetHeader = dbRes[0][0];

            if (resultSetHeader && resultSetHeader.warningStatus === 0) {
                return { success: true };
            } else {
                throw new CustomError(false, 'Error updating user first name');
            }
        } catch (error: any) {
            throw error;
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update a users lastname
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateUserLastName: async function updateUserLastName(
        userId: string,
        lastName: string,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_lastname(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, lastName]);

            return dbRes[0][0];
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update a users phone number
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateUserPhoneNumber: async function updateUserPhoneNumber(
        userId: string,
        phoneNumber: string,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_phonenumber(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, phoneNumber]);

            return dbRes[0][0];
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update a users email address
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateUserEmailAdress: async function updateUserEmailAdress(
        userId: string,
        emailAdress: string,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_emailadress(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, emailAdress]);

            if (dbRes[0][0].success === false) {
                throw new Error(dbRes[0][0].error);
            }
        } catch (error: any) {
            throw error;
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update a users balance
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateUserBalance: async function updateUserBalance(
        userId: string,
        balance: number,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_balance(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, balance]);

            return dbRes[0][0];
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update a users monthly balance
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateUserPartialBalance: async function updateUserPartialBalance(
        userId: string,
        balance: number,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_partial_payment(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, balance]);

            return dbRes[0][0];
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update a users password
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateUserPassword: async function updateUserPassword(
        userId: string,
        password: string,
        res: Response,
        next: NextFunction
    ) {
        bcrypt.hash(password, saltRounds, async function (err: any, hash: any) {
            if (err) {
                return res.status(500).json({ error: true, msg: 'Could not hash password' });
            }
            const db = await database.getDb();
            try {
                password = hash;

                const sql = `CALL update_user_password(?, ?)`;
                const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, password]);

                return dbRes[0][0];
            } catch (error: any) {
                next(error);
            } finally {
                await db.end();
            }
        });
    },
    /**
     * Function to update a users oauth
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateUserOauth: async function updateUserOauth(userId: string, oauth: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_oauth(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, oauth]);

            return dbRes[0][0];
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to delete a user
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    deleteOneUser: async function deleteOneUser(userId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL delete_user(?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);

            return dbRes[0][0];
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
};

export default userModel;
