import mysql from "mysql2/promise";
import config from "../config";

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

    process.on("exit", () => {
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
        let sql = `CALL get_geofences();`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneGeofence: async function getOneGeofence(geofenceId: string) {
        let sql = `CALL get_geofence(?)`;
        let res;

        res = await db.query(sql, [geofenceId]);
        return res[0];
    },
};

export default geofenceModel;
