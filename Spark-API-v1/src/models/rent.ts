import database from '../db/db';

const rentModel = {
    showAllRents: async function showAllRents() {
        const db = await database.getDb();
        try {
            const sql = `CALL get_rents()`;

            const res = await db.query(sql);

            return res[0];
        } finally {
            await db.end();
        }
    },
    getOneRent: async function getOneRent(rentId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_rent(?)`;
            const res = await db.query(sql, [rentId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    getRentsByUserId: async function getRentsByUserId(userId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_rents_by_user(?)`;
            const res = await db.query(sql, [userId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    createOneRent: async function createOneRent(userId: string, bikeId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL create_rent(?, ?)`;
            const res = await db.query(sql, [userId, bikeId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    updateOneRent: async function createOneRent(rentId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_rent(?)`;
            const res = await db.query(sql, [rentId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
};

export default rentModel;
