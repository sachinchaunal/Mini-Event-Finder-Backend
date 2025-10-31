import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  joinEvent,
} from '../controllers';
import {
  createEventValidation,
  queryEventsValidation,
} from '../validators';

const router = Router();

/**
 * @route   POST /api/events
 * @desc    Create a new event
 * @access  Public
 */
router.post('/', createEventValidation, createEvent);

/**
 * @route   GET /api/events
 * @desc    Get all events with optional filters
 * @access  Public
 */
router.get('/', queryEventsValidation, getAllEvents);

/**
 * @route   GET /api/events/:id
 * @desc    Get event by ID
 * @access  Public
 */
router.get('/:id', getEventById);

/**
 * @route   POST /api/events/:id/join
 * @desc    Join an event (increment participant count)
 * @access  Public
 */
router.post('/:id/join', joinEvent);

export default router;
