import database from '../db/db';

const adminModel = {
    /**
     * Function to show all stations
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllAdmins: async function showAllAdmins() {
        const db = await database.getDb();
        try {
            const sql = `CALL get_admins();`;
            const res = await db.query(sql);

            return res[0];
        } finally {
            await db.end();
        }
    },
    getOneAdmin: async function getOneAdmin(adminId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_admin(?)`;
            const res = await db.query(sql, [adminId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    createOneAdmin: async function createOneAdmin(
        firstName: string,
        lastName: string,
        phoneNumber: number,
        emailAdress: string,
        authority: number,
        password: string
    ) {
        const db = await database.getDb();
        try {
            const sql = `CALL create_admin(?, ?, ?, ?, ?, ?)`;
            const res = await db.query(sql, [firstName, lastName, phoneNumber, emailAdress, authority, password]);
            return res[0];
        } finally {
            await db.end();
        }
    },
};

export default adminModel;
