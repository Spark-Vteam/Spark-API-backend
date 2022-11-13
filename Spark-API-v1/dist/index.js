"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mysql = require('mysql2');
require("dotenv").config();
var port = process.env.PORT || 3000;
var connection = mysql.createConnection({
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
var logRequest = function (req, res, next) {
    console.log(req);
    next();
};
var app = (0, express_1.default)();
app.use(logRequest);
app.get("/", function (req, res) {
    var sql = "SELECT * FROM Users;";
    connection.query(sql, function (err, results, fields) {
        if (err)
            throw err;
        console.log(results);
        res.send(results);
    });
});
app.listen(port, function () {
    console.log("Server started on ".concat(port));
});
