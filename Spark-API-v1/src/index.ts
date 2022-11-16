import express, { Application, Request, Response, NextFunction } from 'express';
const port = process.env.PORT || 3000;

const app: Application = express();
import middleware from './middleware/index';
// const middleware = require("./middleware/index.ts");

const mainRoute = require("./routes/main.ts");
const stationsRoute = require("./routes/station.ts");
const userRoute = require("./routes/user.ts");

app.use(middleware.logIncomingToConsole);

app.use('/', mainRoute);
app.use('/', stationsRoute);
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