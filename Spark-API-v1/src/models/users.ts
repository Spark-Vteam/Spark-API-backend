module.exports = {
    showAllUsers: showAllUsers,
};

const mysql = require('mysql2/promise');
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
};
let db: {
    promise(): unknown; end: () => void; query: (arg0: string) => any; 
};

/**
 * Main function.
 * @async
 * @returns void
 */
(async function () {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();

/**
 * Function to show all users
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */

async function showAllUsers() {
    let sql = "SELECT * FROM Users";
    let res; 

    res = await db.query(sql);
    
    return res[0];
}