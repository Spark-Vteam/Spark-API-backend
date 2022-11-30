import express, { Application, Request, Response, NextFunction } from "express";
const port = process.env.PORT || 3000;

const cors = require("cors");
require("dotenv").config();

const app: Application = express();
import { logIncomingToConsole } from "./middleware/index";

app.use(cors());
app.options("*", cors());

import mainRoute from "./routes/main";
import stationsRoute from "./routes/station";
import userRoute from "./routes/user";
import bikeRoute from "./routes/bike";

app.use(logIncomingToConsole);

app.use("/", mainRoute);
app.use("/", stationsRoute);
app.use("/", userRoute);
app.use("/", bikeRoute);

app.listen(port, logStartUpDetailsToConsole);

/**
 * Log app details to console when starting up.
 *
 * @return {void}
 */
function logStartUpDetailsToConsole() {
    let routes: any[] = [];

    // Find what routes are supported
    app._router.stack.forEach(
        (middleware: {
            route: any;
            name: string;
            handle: { stack: any[] };
        }) => {
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
        }
    );

    console.info(`Server is listening on port ${port}.`);
    console.info("Available routes are:");
    console.info(routes);
}
