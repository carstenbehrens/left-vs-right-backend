"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
exports.default = (function (_a) {
    var app = _a.app;
    /**
     * Health Check endpoints
     */
    app.get('/status', function (req, res) {
        res.status(200).end();
    });
    app.head('/status', function (req, res) {
        res.status(200).end();
    });
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');
    // Middleware that transforms the raw string of req.body into json
    app.use(body_parser_1.default.json());
    // Middleware HTTP request logger
    app.use(morgan_1.default('dev'));
    // Load API routes
    /// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    /// error handlers
    app.use(function (err, req, res, next) {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            }
        });
    });
});
