import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config';
import routes from './routes';
import { errorHandler, notFoundHandler, logger } from './middleware';

/**
 * Create and configure Express application
 */
const createApp = (): Application => {
  const app = express();

  // Middleware
  app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger);

  // API Routes
  app.use('/api', routes);

  // Root route
  app.get('/', (_req, res) => {
    res.json({
      success: true,
      message: 'Welcome to Mini Event Finder API',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        events: '/api/events',
      },
    });
  });

  // Error handlers (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
