import { Response, NextFunction } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

import database from '../db/db';

const bikeModel = {
    /**
     * Function to show all bikes
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllBikes: async function showAllBikes(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_bikes();`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get bikes within a radius
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getBikeRadius: async function getBikeRadius(radiusInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_bikes_in_radius(?,?,?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                radiusInfo.latitude,
                radiusInfo.longitude,
                radiusInfo.radius,
            ]);

            res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get all charging bikes
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getAllChargingBikes: async function getAllChargingBikes(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_charging_bikes_location()`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get all charging bikes at specific station
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getChargingBikesAtStation: async function getChargingBikesAtStation(
        stationId: string,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_charging_bikes_by_location(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [stationId]);

            res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get one bike by id
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getOneBike: async function getOneBike(bikeId: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_bike(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [bikeId]);

            res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to get bikes within a city
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    getBikesByCity: async function getBikesByCity(city: string, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_bikes_by_city(?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [city]);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update a bike
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateOneBike: async function updateOneBike(bikeInfo: any, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_bike(?, ?, ?, ?, ?)`;
            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                bikeInfo.bikeId,
                bikeInfo.position,
                bikeInfo.battery,
                bikeInfo.status,
                bikeInfo.speed,
            ]);

            res.status(200).send({ success: true, msg: `Bike with id ${bikeInfo.bikeId} has been updated` });
        } catch (error: any) {
            next(res.status(404).send(error));
        } finally {
            await db.end();
        }
    },
};

export default bikeModel;
