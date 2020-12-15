"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.prototype.debug = function (msg) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.debug.apply(console, __spreadArrays([msg], optionalParams));
    };
    Log.prototype.info = function (msg) {
        console.info(msg);
    };
    Log.prototype.warn = function (msg) {
        console.warn(msg);
    };
    Log.prototype.error = function (msg) {
        console.error(msg);
    };
    return Log;
}());
exports.default = Log;
