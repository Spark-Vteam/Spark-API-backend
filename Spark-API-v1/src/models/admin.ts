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
    /**
     * Function to get one admin by mail
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

            if (admin.length > 0) {
                console.log(admin);
            }

            return res.send(dbRes[0][0]);
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to verify a hashed password
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    comparePasswords: async function comparePasswords(res: Response, user: any, password: string) {
        bcrypt.compare(password, user.Password, function (err: any, result: any) {
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
                const payload = { email: user.EmailAdress };
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign(payload, secret, { expiresIn: '1h' });

                return res.status(201).json({
                    data: {
                        _id: user.id,
                        email: user.EmailAdress,
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
