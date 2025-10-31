import { body, query, ValidationChain } from 'express-validator';

/**
 * Validation rules for creating an event
 */
export const createEventValidation: ValidationChain[] = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Location must be between 3 and 200 characters'),

  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),

  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),

  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date')
    .custom((value) => {
      const eventDate = new Date(value);
      const now = new Date();
      if (eventDate < now) {
        throw new Error('Event date cannot be in the past');
      }
      return true;
    }),

  body('maxParticipants')
    .notEmpty()
    .withMessage('Maximum participants is required')
    .isInt({ min: 1, max: 10000 })
    .withMessage('Maximum participants must be between 1 and 10000'),

  body('currentParticipants')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Current participants must be a non-negative integer')
    .custom((value, { req }) => {
      if (value > req.body.maxParticipants) {
        throw new Error('Current participants cannot exceed maximum participants');
      }
      return true;
    }),
];

/**
 * Validation rules for querying events
 */
export const queryEventsValidation: ValidationChain[] = [
  query('location')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Location must be between 1 and 200 characters'),

  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),

  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),

  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),
];
