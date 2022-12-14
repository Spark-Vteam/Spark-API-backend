import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// Middleware
import { logIncomingToConsole } from './middleware/index';
import { invalidPathHandler, errorHandler } from './middleware/errorHandler';

import apiKeyModel from './models/apiKeys';

const port = process.env.PORT || 4000;

const cors = require('cors');

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


app.all('*', apiKeyModel.checkAPIKey);

app.use('/', require('./versions/v1/routes/apiKeys'));
app.use('/', require('./versions'));

app.use(errorHandler);

const server = httpServer.listen(port, () => {
    console.log('Spark api listening on port ' + port + '\n');
});

export default server;
