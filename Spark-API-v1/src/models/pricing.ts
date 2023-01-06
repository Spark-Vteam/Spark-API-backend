import { NextFunction, Response } from 'express';
import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import PricingInfo from 'src/interfaces/pricingInfo';
import { CustomError } from '../middleware/errorHandler';

const pricingModel = {
    /**
     * Function to show all rents
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllPricings: async function showAllPricings(res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_pricings()`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql);

            return res.status(200).send({ success: true, data: dbRes[0][0] });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to create one pricing
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    createOnePricing: async function createOnePricing(pricingInfo: PricingInfo, res: Response, next: NextFunction) {
        const db = await database.getDb();
        try {
            const sql = `CALL create_pricing(?, ?, ?, ?, ?, ?, ?, ?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                pricingInfo.type,
                pricingInfo.description,
                pricingInfo.start,
                pricingInfo.minute,
                pricingInfo.parking,
                pricingInfo.discountStartFree,
                pricingInfo.discountEndParkingZone,
                pricingInfo.discountEndCharging,
            ]);

            return res.status(200).send({ success: true, msg: `Pricing has been created` });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
    /**
     * Function to update a pricing
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    updateOnePricing: async function updateOnePricing(
        pricingId: string,
        pricingInfo: PricingInfo,
        res: Response,
        next: NextFunction
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_pricing(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const dbRes: [RowDataPacket[], FieldPacket[]] = await db.query(sql, [
                pricingId,
                pricingInfo.type,
                pricingInfo.description,
                pricingInfo.start,
                pricingInfo.minute,
                pricingInfo.parking,
                pricingInfo.discountStartFree,
                pricingInfo.discountEndParkingZone,
                pricingInfo.discountEndCharging,
            ]);

            return res.status(200).send({ success: true, msg: `Pricing has been updated` });
        } catch (error: any) {
            next(error);
        } finally {
            await db.end();
        }
    },
};

export default pricingModel;
