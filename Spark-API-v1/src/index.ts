import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
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
import { invalidPathHandler } from './middleware/errorHandler';
const port = process.env.PORT || 4000;

const cors = require('cors');
require('dotenv').config();

const app: Application = express();
const httpServer = require('http').createServer(app);

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logIncomingToConsole);

app.use('/', mainRoute);
app.use('/', stationsRoute);
app.use('/', userRoute);
app.use('/', bikeRoute);
app.use('/', rentRoute);
app.use('/', adminRoute);
app.use('/', invoiceRoute);
app.use('/', geofenceRoute);
app.use('/', chargerRoute);
app.use('/', authRoute);

app.use(invalidPathHandler);

const server = httpServer.listen(port, () => {
    console.log('Spark api listening on port ' + port);
});

export default server;
