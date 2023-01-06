import { NextFunction, Response } from 'express';
import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

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

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get one station
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneAdmin: async function getOneAdmin(adminId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_admin(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [adminId]);

            res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to manually login with an admin
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    adminLogin: async function adminLogin(adminInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();

        const email = adminInfo.emailAdress;
        const password = adminInfo.password;

        try {
            const sql = `CALL get_admin_by_email(?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [email]);

            const admin = dbRes[0][0];

            console.log(admin);

            if (admin.length > 0) {
                return adminModel.comparePasswords(res, admin[0], password);
            } else if (admin.length === 0) {
                return res.status(400).json({ success: false, msg: 'No user found' });
            }

            return res.status(400).json({ success: false, msg: 'Missing credentials' });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to verify a hashed password
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    comparePasswords: async function comparePasswords(res: Response, admin: any, password: string) {
        bcrypt.compare(password, admin.Password, function (err: any, result: any) {
            console.log(result);

            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        message: 'Could not decrypt password.',
                    },
                });
            }

            if (result) {
                const payload = { email: admin.emailAdress };
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign(payload, secret, { expiresIn: '1h' });

                return res.status(201).json({
                    data: {
                        info: { admin },
                        token: token,
                        msg: 'Admin logged in',
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
     * Function to create a admin
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    createOneAdmin: async function createOneAdmin(adminInfo: any, res: Response, next: NextFunction) {
        bcrypt.hash(adminInfo.password, saltRounds, async function (error: any, hash: any) {
            const db = await database.getDb();
            try {
                adminInfo.password = hash;

                const sql = `CALL create_admin(?, ?, ?, ?, ?, ?)`;
                const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                    adminInfo.firstName,
                    adminInfo.lastName,
                    adminInfo.phoneNumber,
                    adminInfo.emailAdress,
                    adminInfo.authority,
                    adminInfo.password,
                ]);

                return res.status(201).send({ success: true, msg: 'Admin registered' });
            } catch (error: any) {
                next(error);
            } finally {
                await db.end();
            }
        });
    },
};

export default adminModel;
