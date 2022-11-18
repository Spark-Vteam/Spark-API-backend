import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
};

let db: {
    promise(): unknown;
    end: () => void;
    query: (arg0: string) => any;
};
/**
 * Main function to connect to database.
 * @async
 * @returns void
 */
(async function () {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();

const stationModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllStations: async function showAllStations() {
        let sql = "SELECT * FROM Stations";
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneStation: async function getOneStation(id: string) {
        let sql = `SELECT * FROM Stations WHERE id = ${id}`;
        let res;

        res = await db.query(sql);
        return res[0]; 
    },
};

export default stationModel;
