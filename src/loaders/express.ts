import routes from '../api';
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/httpException';
import { ILogger } from '../interfaces/ILogger';

export default (app: express.Application, logger: ILogger) => {
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
  app.use((req, res, next) => {
    logger.info(`${req.method}: ${req.url}`);
    next();
  });

  // Load API routes
  app.use(routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    next(err);
  });

  /// error handlers
  app.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      return next(err);
    }
  );

  app.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: 'Internal Server Error'
        }
      });
    }
  );
};
