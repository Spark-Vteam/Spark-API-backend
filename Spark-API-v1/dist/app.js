"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = require("./middleware/index");
const errorHandler_1 = require("./middleware/errorHandler");
const apiKeys_1 = __importDefault(require("./models/apiKeys"));
const port = process.env.PORT || 4000;
const cors = require('cors');
const app = (0, express_1.default)();
const httpServer = require('http').createServer(app);
app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');
if (process.env.NODE_ENV !== 'test') {
    app.use((0, morgan_1.default)('combined'));
}
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(index_1.logIncomingToConsole);
app.all('*', apiKeys_1.default.checkAPIKey);
app.use('/', require('./versions/v1/routes/apiKeys'));
app.use('/', require('./versions'));
app.use(errorHandler_1.errorHandler);
const server = httpServer.listen(port, () => {
    console.log('Spark api listening on port ' + port + '\n');
});
exports.default = server;
