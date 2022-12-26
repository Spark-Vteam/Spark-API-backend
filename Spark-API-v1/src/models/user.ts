import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { Response, NextFunction } from 'express';

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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
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
        const db = await database.getDb();
        try {
            const sql = `CALL create_user(?, ?, ?, ?, ?,?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                userInfo.firstName,
                userInfo.lastName,
                userInfo.phoneNumber,
                userInfo.emailAdress,
                userInfo.password,
                userInfo.oauth,
            ]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
        } finally {
            await db.end();
        }
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, firstName]);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, lastName]);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, phoneNumber]);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, emailAdress]);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
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
            const res = await db.query(sql, [userId, balance]);

            return res[0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, balance]);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
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
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_password(?, ?)`;
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, password]);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
        } finally {
            await db.end();
        }
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, oauth]);

            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
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
            const res: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);
            return res[0][0];
        } catch (error: any) {
            next(res.status(404).send({ error: true, db: { error } }));
        } finally {
            await db.end();
        }
    },
};

export default userModel;
