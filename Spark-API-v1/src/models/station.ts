import database from '../db/db';

const stationModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllStations: async function showAllStations() {
        const db = await database.getDb();
        try {
            const sql = `CALL get_stations();`;
            const res = await db.query(sql);

            return res[0];
            // Error always empty . . .
            // } catch (error) {
            //     return error;
        } finally {
            await db.end();
        }
    },
    getOneStation: async function getOneStation(stationId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_station(?)`;

            const res = await db.query(sql, [stationId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
};

export default stationModel;
