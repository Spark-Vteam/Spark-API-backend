import mysql from "mysql2/promise";
import config from "../config";
import { async } from "../connect_db";

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


const userModel = {
    /**
     * Function to show all users
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllUsers: async function showAllUsers() {
        let sql = `CALL get_users();`;
        let res;

        res = await db.query(sql);

        return res[0];
    },
    getOneUser: async function getOneUser(userId: string) {
        let sql = `CALL get_user(?)`;
        let res;

        res = await db.query(sql, [userId]);
        return res[0];
    },
    updateUserFirstName: async function updateUserFirstName(userId: string, firstName: string) {
        let sql = `CALL update_user_firstname(?, ?)`;
        let res;
        
        res = await db.query(sql, [userId, firstName]);

        return res[0];
    },
    deleteOneUser: async function deleteOneUser(userId: string) {
        let sql = `CALL delete_user(?)`;
        let res;

        res = await db.query(sql, [userId]);
        return res[0];
    },
};

export default userModel;
