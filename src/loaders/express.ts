import routes from '../api';
import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';

export default (app: express.Application) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Middleware HTTP request logger
  app.use(logger('dev'));

  // Load API routes
  app.use(routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
