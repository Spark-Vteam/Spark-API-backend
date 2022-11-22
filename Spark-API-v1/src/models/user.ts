import mysql from "mysql2/promise";
import config from "../config"

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
        password: config.DB_PASSWORD  
    });

    process.on("exit", () => {
        db.end();
    });
})();

const userModel = {
    /**
     * Function to show all users
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllUsers: async function showAllUsers() {
        let sql = "SELECT * FROM Users";
        let res;

        res = await db.query(sql);

        return res[0];
    },
};

export default userModel;
