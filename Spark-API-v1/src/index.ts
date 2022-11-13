import express, {Application, Request, Response, NextFunction } from 'express';
const mysql = require('mysql2');
require("dotenv").config();

const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
});

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log("HEj");
    // console.log(req);
    next();
};

const app: Application = express();

app.use(logRequest);

app.get("/", (req: Request, res: Response) => {
    const sql = "SELECT * FROM Users;";

    connection.query(sql, (err:any, results:any, fields:any) => {
        if (err) throw err;
        // console.log(results);
        

        res.send(results)
    });
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
