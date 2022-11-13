import express, { Application, Request, Response, NextFunction } from 'express';
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

const app: Application = express();
const middleware = require("./middleware/index.ts");

const userRoute = require("./routes/users.ts");

// app.get("/", (req: Request, res: Response) => {
//     res.send("Main route for Spark API");
//     const sql = "SELECT * FROM Users;";

//     connection.query(sql, (err:any, results:any, fields:any) => {
//         if (err) throw err;
//         // console.log(results);
//         res.send(results)
//     });
// });

app.use(middleware.logIncomingToConsole);
app.use('/', userRoute);
app.listen(port, logStartUpDetailsToConsole);

/**
 * Log app details to console when starting up.
 *
 * @return {void}
 */
function logStartUpDetailsToConsole() {
    let routes: any[] = [];

    // Find what routes are supported
    app._router.stack.forEach((middleware: { route: any; name: string; handle: { stack: any[]; }; }) => {
        if (middleware.route) {
            // Routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            // Routes added as router middleware
            middleware.handle.stack.forEach((handler) => {
                let route;

                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    console.info(`Server is listening on port ${port}.`);
    console.info("Available routes are:");
    console.info(routes);
}