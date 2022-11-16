import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

/**
 * Main function to connect to database.
 * @async
 * @returns void
 */
export async function connectDb() {
    const config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
    };
    
    let db: mysql.Connection;

    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
};