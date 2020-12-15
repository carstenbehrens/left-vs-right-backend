"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = __importDefault(require("./routes/index"));
exports.default = (function () {
    var app = express_1.Router();
    index_1.default(app);
    return app;
});
