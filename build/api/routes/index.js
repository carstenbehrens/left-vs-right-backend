"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var route = express_1.Router();
exports.default = (function (app) {
    app.use('/', route);
    /* GET home page. */
    route.get('/', function (req, res, next) {
        res.send({ msg: 'nothing here' });
    });
});
