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

const chargerModel = {
    /**
     * Function to show all chargers
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllChargers: async function showAllChargers() {
        let sql = `CALL get_chargers();`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneCharger: async function getOneCharger(chargerId: string) {
        let sql = `CALL get_charger(?)`;
        let res;

        res = await db.query(sql, [chargerId]);
        return res[0];
    },
    updateStatus: async function updateStatus(
        chargerId: string,
        status: string
    ) {
        let sql = `CALL update_charger_status(?, ?)`;
        let res;

        res = await db.query(sql, [chargerId, status]);
        return res[0];
    },
};

export default chargerModel;
