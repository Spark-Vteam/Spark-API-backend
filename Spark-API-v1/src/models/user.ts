import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { Response, NextFunction } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { v4 as uuid } from 'uuid';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// generate a unique API key
const apiKey = uuid();
// save the API key to the .env file
require('dotenv').config({ path: '.env', env: { API_KEY: apiKey } });

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
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
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

                const sql_user = `CALL create_user(?, ?, ?, ?, ?,?)`;
                const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql_user, [
                    userInfo.firstName,
                    userInfo.lastName,
                    userInfo.phoneNumber,
                    userInfo.emailAdress,
                    userInfo.password,
                    userInfo.oauth,
                ]);

                return res.status(200).send({ success: true, msg: 'New user registered' });
            } catch (error: any) {
                next(error);
            } finally {
                await db.end();
            }
        });
    },
    /**
     * Function to login a user
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    userLogin: async function userLogin(userInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();

        const email = userInfo.emailAdress;
        const password = userInfo.password;
        try {
            const sql = `CALL get_user_by_email(?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [email]);

            const user = dbRes[0][0];

            if (user.length > 0) {
                return userModel.comparePasswords(res, user[0], password);
            }

            return res.status(400).send({ success: false, msg: 'Missing credentials' });
        } catch (error) {
            next(error);
        }
    },
    /**
     * Function to verify a hashed password
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    comparePasswords: async function comparePasswords(res: Response, user: any, password: string) {
        bcrypt.compare(password, user.Password, function (err: any, result: any) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        message: 'Could not decrypt password.',
                    },
                });
            }

            if (result) {
                const payload = { email: user.EmailAdress };
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign(payload, secret, { expiresIn: '1h' });
                console.log(user);

                return res.status(201).json({
                    data: {
                        info: { user },
                        token: token,
                        msg: 'User logged in',
                    },
                });
            }
            return res.status(401).json({
                errors: {
                    status: 401,
                    message: 'Password not correct',
                },
            });
        });
    },
    /**
     * Function to update a users first name
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
            console.log(resultSetHeader);

            return dbRes[0][0];
        } catch (error: any) {
            next(new CustomError(false, 'Error updating user first name'));
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
            next(new CustomError(false, 'Error updating user last name'));
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
            next(new CustomError(false, 'Error updating user phone number'));
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

            return dbRes[0][0];
        } catch (error: any) {
            next(new CustomError(false, 'Error updating user email adress'));
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

            return res
                .status(200)
                .send({ success: true, msg: `User with ${userId} has added ${balance} to its balance` });
        } catch (error: any) {
            next(new CustomError(false, 'Error updating user balance'));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update a users payment option
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateUserPaymentOption: async function updateUserPaymentOption(
        userId: string,
        balance: number,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_partial_payment(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [userId, balance]);
            
            if (!balance) {
                throw Error();
            }

            return res
                .status(201)
                .send({ success: true, msg: `User with id ${userId} has changed to payment option ${balance}` });
        } catch (error: any) {
            next(new CustomError(false, 'Error updating user balance'));
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

                return res.status(201).send({ success: true, msg: `User with id ${userId} has updated its password` });
            } catch (error: any) {
                next(new CustomError(false, 'Error updating user password'));
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
            next(new CustomError(false, 'Error updating user oauth'));
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

            return res.status(200).send({ success: true, msg: `User with id ${userId} was deleted` });
        } catch (error: any) {
            next(new CustomError(false, 'Could not delete user'));
        } finally {
            await db.end();
        }
    },
};

export default userModel;
