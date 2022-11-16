module.exports = {
    connectDb: connectDb,
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

/**
 * Main function to connect to database.
 * @async
 * @returns void
 */
async function connectDb() {
    let db: {
        promise(): unknown; end: () => void; query: (arg0: string) => any; 
    };
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
};