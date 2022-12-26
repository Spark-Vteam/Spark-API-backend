import mysql from 'mysql2/promise';
import config from '../../../config';

const database = {
    /**
     * Main function to connect to database.
     * @async
     * @returns void
     */
    getDb: async function getDb() {
        let db: mysql.Connection;
        db = await mysql.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            database: config.DB_NAME,
            password: config.DB_PASSWORD,
        });
        // console.log('Db', db);
        return db;
    },
};

export default database;
