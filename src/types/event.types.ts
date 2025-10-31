/**
 * Event interface representing an event in the system
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  date: Date;
  maxParticipants: number;
  currentParticipants: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO for creating a new event
 */
export interface CreateEventDTO {
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  date: string;
  maxParticipants: number;
  currentParticipants?: number;
}

/**
 * Query parameters for filtering events
 */
export interface EventQueryParams {
  location?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}
