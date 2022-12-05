import database from '../db/db';

const geofenceModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllGeofences: async function showAllGeofences() {
        const db = await database.getDb();
        try {
            const sql = `CALL get_geofences();`;
            const res = await db.query(sql);

            return res[0];
        } finally {
            await db.end();
        }
    },
    getOneGeofence: async function getOneGeofence(geofenceId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_geofence(?)`;
            const res = await db.query(sql, [geofenceId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    createOneGeofence: async function createOneGeofence(coordinates: string, info: string, type: number) {
        const db = await database.getDb();
        try {
            const sql = `CALL create_geofence(?, ? ,?)`;
            const res = await db.query(sql, [coordinates, info, type]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    updateCoordinates: async function updateCoordinates(geofenceId: string, coordinates: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_geofence_coordinates(?, ?)`;
            const res = await db.query(sql, [geofenceId, coordinates]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    updateInfo: async function updateInfo(geofenceId: string, info: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_geofence_info(?, ?)`;
            const res = await db.query(sql, [geofenceId, info]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    updateType: async function updateType(geofenceId: string, type: number) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_geofence_type(?, ?)`;
            const res = await db.query(sql, [geofenceId, type]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    deleteOneGeofence: async function deleteOneGeofence(geofenceId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL delete_geofence(?)`;
            const res = await db.query(sql, [geofenceId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
};

export default geofenceModel;
