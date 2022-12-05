import mysql from 'mysql2/promise';

import config from '../config';

let db: mysql.Connection;
/**
 * Main function to connect to database.
 * @async
 * @returns void
 */
(async function () {
    db = await mysql.createConnection({
        host: config.DB_HOST,
        user: config.DB_USER,
        database: config.DB_NAME,
        password: config.DB_PASSWORD,
    });

    process.on('exit', () => {
        db.end();
    });
})();

const geofenceModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllGeofences: async function showAllGeofences() {
        const sql = `CALL get_geofences();`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneGeofence: async function getOneGeofence(geofenceId: string) {
        const sql = `CALL get_geofence(?)`;
        let res;

        res = await db.query(sql, [geofenceId]);
        return res[0];
    },
    createOneGeofence: async function createOneGeofence(coordinates: string, info: string, type: number) {
        const sql = `CALL create_geofence(?, ? ,?)`;
        let res;

        res = await db.query(sql, [coordinates, info, type]);
        return res[0];
    },
    updateCoordinates: async function updateCoordinates(geofenceId: string, coordinates: string) {
        const sql = `CALL update_geofence_coordinates(?, ?)`;
        let res;

        res = await db.query(sql, [geofenceId, coordinates]);
        return res[0];
    },
    updateInfo: async function updateInfo(geofenceId: string, info: string) {
        const sql = `CALL update_geofence_info(?, ?)`;
        let res;

        res = await db.query(sql, [geofenceId, info]);
        return res[0];
    },
    updateType: async function updateType(geofenceId: string, type: number) {
        const sql = `CALL update_geofence_type(?, ?)`;
        let res;

        res = await db.query(sql, [geofenceId, type]);
        return res[0];
    },
    deleteOneGeofence: async function deleteOneGeofence(geofenceId: string) {
        const sql = `CALL delete_geofence(?)`;
        let res;

        res = await db.query(sql, [geofenceId]);
        return res[0];
    },
};

export default geofenceModel;
