import { NextFunction, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import database from '../db/db';
import { CustomError } from '../middleware/errorHandler';

const geofenceModel = {
    /**
     * Function to show all geofences
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllGeofences: async function showAllGeofences(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_geofences();`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get one geofence
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneGeofence: async function getOneGeofence(geofenceId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_geofence(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [geofenceId]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to create one geofence
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    createOneGeofence: async function createOneGeofence(geofenceInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL create_geofence(?, ? ,?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                geofenceInfo.coordinates,
                geofenceInfo.info,
                geofenceInfo.type,
            ]);

            return res.status(200).send({
                success: true,
                msg: `A new geofence has been created.`,
            });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update coordinates of one geofence
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateCoordinates: async function updateCoordinates(geofenceInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_geofence_coordinates(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                geofenceInfo.geofenceId,
                geofenceInfo.coordinates,
            ]);
            return res.status(200).send({
                success: true,
                msg: `Geofence with id has been updated with new coordinates ${geofenceInfo.coordinates}`,
            });
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update information of one geofence
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateInfo: async function updateInfo(geofenceInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            if (!geofenceInfo.info) {
                throw new CustomError(false, 'No info given');
            }

            const sql = `CALL update_geofence_info(?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                geofenceInfo.geofenceId,
                geofenceInfo.info,
            ]);

            return res
                .status(200)
                .send({ succes: true, msg: `Geofence with id has been updated with new info ${geofenceInfo.info}` });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },

    /**
     * Function to update type of one geofence
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateType: async function updateType(geofenceInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_geofence_type(?, ?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                geofenceInfo.geofenceId,
                geofenceInfo.type,
            ]);

            return res
                .status(200)
                .send({ success: true, msg: `Geofence with id has been updated with new type ${geofenceInfo.type}` });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },

    /**
     * Function to delete one geofence
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    deleteOneGeofence: async function deleteOneGeofence(geofenceId: number, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL delete_geofence(?)`;

            const dbRes = await db.query(sql, [geofenceId]);

            return res
                .status(200)
                .send({ success: true, msg: `Geofence with id ${geofenceId} has been deleted (Type 40)` });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
};

export default geofenceModel;
