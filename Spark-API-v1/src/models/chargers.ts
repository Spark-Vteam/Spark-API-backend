import database from '../db/db';

const chargerModel = {
    /**
     * Function to show all chargers
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllChargers: async function showAllChargers() {
        const db = await database.getDb();
        try {
            const sql = `CALL get_chargers();`;
            const res = await db.query(sql);

            return res[0];
        } finally {
            await db.end();
        }
    },
    getOneCharger: async function getOneCharger(chargerId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_charger(?)`;
            const res = await db.query(sql, [chargerId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    updateStatus: async function updateStatus(chargerId: string, status: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_charger_status(?, ?)`;
            const res = await db.query(sql, [chargerId, status]);
            return res[0];
        } finally {
            await db.end();
        }
    },
};

export default chargerModel;
