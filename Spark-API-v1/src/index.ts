import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import { logIncomingToConsole } from './middleware/index';
import mainRoute from './routes/main';
import stationsRoute from './routes/station';
import userRoute from './routes/user';
import bikeRoute from './routes/bike';
import rentRoute from './routes/rent';
import adminRoute from './routes/admin';
import invoiceRoute from './routes/invoice';
import geofenceRoute from './routes/geofence';
import chargerRoute from './routes/charger';
import authRoute from './routes/auth';
const port = process.env.PORT || 4000;

const cors = require('cors');
require('dotenv').config();

const app: Application = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logIncomingToConsole);

app.use("/", mainRoute);
app.use("/", stationsRoute);
app.use("/", userRoute);
app.use("/", bikeRoute);
app.use("/", rentRoute);
app.use("/", adminRoute);
app.use("/", invoiceRoute);
app.use("/", geofenceRoute);
app.use("/", chargerRoute);
app.use("/", authRoute);

const server = app.listen(port, logStartUpDetailsToConsole);

/**
 * Log app details to console when starting up.
 *
 * @return {void}
 */
function logStartUpDetailsToConsole() {
    const routes: any[] = [];

    // Find what routes are supported
    app._router.stack.forEach((middleware: { route: any; name: string; handle: { stack: any[] } }) => {
        if (middleware.route) {
            // Routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === 'router') {
            // Routes added as router middleware
            middleware.handle.stack.forEach((handler) => {
                let route;

                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    console.info(`Server is listening on port ${port}.`);
    console.info('Available routes are:');
    console.info(routes);
}

export default server;
