import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { eventStore } from '../models';
import { CreateEventDTO, EventQueryParams } from '../types';

/**
 * Create a new event
 * POST /api/events
 */
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const eventData: CreateEventDTO = req.body;
    const event = eventStore.createEvent(eventData);

    res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all events with optional filters
 * GET /api/events
 */
export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const filters: EventQueryParams = {
      location: req.query.location as string | undefined,
      search: req.query.search as string | undefined,
      startDate: req.query.startDate as string | undefined,
      endDate: req.query.endDate as string | undefined,
    };

    const events = eventStore.getAllEvents(filters);

    res.status(200).json({
      success: true,
      data: events,
      count: events.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get event by ID
 * GET /api/events/:id
 */
export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const event = eventStore.getEventById(id);

    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Join an event (increment participant count)
 * POST /api/events/:id/join
 */
export const joinEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const event = eventStore.joinEvent(id);

    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: event,
      message: 'Successfully joined the event',
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }
    next(error);
  }
};
