import database from '../db/db';

const userModel = {
    /**
     * Function to show all users
     * @async
     * @returns {RowDataPacket} Resultset from the query.
     */
    showAllUsers: async function showAllUsers() {
        const db = await database.getDb();
        try {
            const sql = `CALL get_users();`;
            const res = await db.query(sql);

            return res[0];
        } finally {
            await db.end();
        }
    },
    getOneUser: async function getOneUser(userId: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL get_user(?)`;
            const res = await db.query(sql, [userId]);
            return res[0];
        } finally {
            await db.end();
        }
    },
    updateUserFirstName: async function updateUserFirstName(userId: string, firstName: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_firstname(?, ?)`;
            const res = await db.query(sql, [userId, firstName]);

            return res[0];
        } finally {
            await db.end();
        }
    },
    updateUserLastName: async function updateUserLastName(userId: string, lastName: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_lastname(?, ?)`;
            const res = await db.query(sql, [userId, lastName]);

            return res[0];
        } finally {
            await db.end();
        }
    },
    updateUserPhoneNumber: async function updateUserPhoneNumber(userId: string, phoneNumber: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_phonenumber(?, ?)`;
            const res = await db.query(sql, [userId, phoneNumber]);

            return res[0];
        } finally {
            await db.end();
        }
    },
    updateUserEmailAdress: async function updateUserEmailAdress(userId: string, emailAdress: string) {
        const db = await database.getDb();
        try {
            const sql = `CALL update_user_emailadress(?, ?)`;
            const res = await db.query(sql, [userId, emailAdress]);

            return res[0];
        } finally {
            await db.end();
        }
    },
    updateUserBalance: async function updateUserBalance(userId: string, balance: number) {
        const sql = `CALL update_user_balance(?, ?)`;
        let res;

        res = await db.query(sql, [userId, balance]);

        return res[0];
    },
    deleteOneUser: async function deleteOneUser(userId: string) {
        const sql = `CALL delete_user(?)`;
        let res;

        res = await db.query(sql, [userId]);
        return res[0];
    },
};

export default userModel;
