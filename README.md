# Mini Event Finder - Backend

Backend API for the Mini Event Finder application built with Node.js, Express, and TypeScript.

## Features

- ✅ RESTful API with TypeScript
- ✅ In-memory data storage
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ CORS support
- ✅ Request logging
- ✅ Clean architecture and separation of concerns

## API Endpoints

### Events

- **POST** `/api/events` - Create a new event
- **GET** `/api/events` - Get all events (with optional filters)
- **GET** `/api/events/:id` - Get event by ID

### Query Parameters (GET /api/events)

- `location` - Filter by location (partial match)
- `search` - Search in title and description
- `startDate` - Filter events starting from this date
- `endDate` - Filter events until this date

### Event Schema

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "location": "string",
  "date": "ISO 8601 date",
  "maxParticipants": "number",
  "currentParticipants": "number",
  "createdAt": "ISO 8601 date",
  "updatedAt": "ISO 8601 date"
}
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
copy .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Development

Run the development server with hot reload:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Production

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # Data models and storage
│   ├── routes/          # API routes
│   ├── types/           # TypeScript type definitions
│   ├── validators/      # Input validation
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── dist/                # Compiled JavaScript (generated)
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json        # TypeScript configuration
└── README.md
```

## Validation Rules

### Create Event

- **title**: 3-100 characters, required
- **description**: 10-1000 characters, required
- **location**: 3-200 characters, required
- **date**: Valid ISO 8601 date, cannot be in the past
- **maxParticipants**: 1-10000, required
- **currentParticipants**: 0 or greater, cannot exceed maxParticipants (optional)

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Validation errors if applicable
}
```

## CORS Configuration

The API is configured to accept requests from the frontend origin specified in the `.env` file. Update `CORS_ORIGIN` to match your frontend URL.

## License

ISC
