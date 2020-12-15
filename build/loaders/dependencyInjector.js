"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var logger_1 = __importDefault(require("./logger"));
exports.default = (function () {
    var logger = new logger_1.default();
    try {
        typedi_1.Container.set('logger', logger);
        logger.info('✌️ Agenda injected into container');
    }
    catch (e) {
        logger.error('🔥 Error on dependency injector loader: %o', e);
    }
});
