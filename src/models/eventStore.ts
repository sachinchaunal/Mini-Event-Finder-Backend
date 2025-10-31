import { v4 as uuidv4 } from 'uuid';
import { Event, CreateEventDTO, EventQueryParams } from '../types';

/**
 * In-memory storage for events
 */
class EventStore {
  private events: Map<string, Event> = new Map();

  /**
   * Create a new event
   */
  createEvent(eventData: CreateEventDTO): Event {
    const event: Event = {
      id: uuidv4(),
      title: eventData.title,
      description: eventData.description,
      location: eventData.location,
      latitude: eventData.latitude,
      longitude: eventData.longitude,
      date: new Date(eventData.date),
      maxParticipants: eventData.maxParticipants,
      currentParticipants: eventData.currentParticipants || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.events.set(event.id, event);
    return event;
  }

  /**
   * Get all events with optional filtering
   */
  getAllEvents(filters?: EventQueryParams): Event[] {
    let events = Array.from(this.events.values());

    // Filter by location (case-insensitive partial match)
    if (filters?.location) {
      const locationFilter = filters.location.toLowerCase();
      events = events.filter((event) =>
        event.location.toLowerCase().includes(locationFilter)
      );
    }

    // Filter by search (searches in title and description)
    if (filters?.search) {
      const searchFilter = filters.search.toLowerCase();
      events = events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchFilter) ||
          event.description.toLowerCase().includes(searchFilter)
      );
    }

    // Filter by date range
    if (filters?.startDate) {
      const startDate = new Date(filters.startDate);
      events = events.filter((event) => event.date >= startDate);
    }

    if (filters?.endDate) {
      const endDate = new Date(filters.endDate);
      events = events.filter((event) => event.date <= endDate);
    }

    // Sort by date (ascending)
    events.sort((a, b) => a.date.getTime() - b.date.getTime());

    return events;
  }

  /**
   * Get event by ID
   */
  getEventById(id: string): Event | undefined {
    return this.events.get(id);
  }

  /**
   * Update event
   */
  updateEvent(id: string, updates: Partial<Event>): Event | undefined {
    const event = this.events.get(id);
    if (!event) {
      return undefined;
    }

    const updatedEvent = {
      ...event,
      ...updates,
      id: event.id, // Prevent ID from being changed
      createdAt: event.createdAt, // Prevent createdAt from being changed
      updatedAt: new Date(),
    };

    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  /**
   * Delete event
   */
  deleteEvent(id: string): boolean {
    return this.events.delete(id);
  }

  /**
   * Join event (increment participant count)
   */
  joinEvent(id: string): Event | null {
    const event = this.events.get(id);
    
    if (!event) {
      return null;
    }

    // Check if event is full
    if (event.currentParticipants >= event.maxParticipants) {
      throw new Error('Event is already full');
    }

    // Check if event is in the past
    if (event.date < new Date()) {
      throw new Error('Cannot join past events');
    }

    // Increment participant count
    const updatedEvent = {
      ...event,
      currentParticipants: event.currentParticipants + 1,
      updatedAt: new Date(),
    };

    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  /**
   * Leave event (decrement participant count)
   */
  leaveEvent(id: string): Event | null {
    const event = this.events.get(id);
    
    if (!event) {
      return null;
    }

    // Check if there are participants to remove
    if (event.currentParticipants <= 0) {
      throw new Error('No participants to remove');
    }

    // Decrement participant count
    const updatedEvent = {
      ...event,
      currentParticipants: event.currentParticipants - 1,
      updatedAt: new Date(),
    };

    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  /**
   * Check if event exists
   */
  eventExists(id: string): boolean {
    return this.events.has(id);
  }

  /**
   * Get total event count
   */
  getCount(): number {
    return this.events.size;
  }
}

// Export singleton instance
export const eventStore = new EventStore();
