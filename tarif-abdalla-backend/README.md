# COMP229 Assignment 2 Backend

This backend implements the required Node.js + Express + MongoDB REST API for references, projects, services, and users.

## 1) Setup

1. Copy `.env.example` to `.env`.
2. Fill `MONGODB_URI` with your MongoDB Atlas URI (or keep fallback for local MongoDB).
3. Install dependencies:

```bash
npm install
```

4. Run in development:

```bash
npm run dev
```

5. Run in production mode:

```bash
npm start
```

Base URL: `http://localhost:3000`

## 2) API Routes

### References
- `GET /api/references`
- `GET /api/references/:id`
- `POST /api/references`
- `PUT /api/references/:id`
- `DELETE /api/references/:id`

### Projects
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Services
- `GET /api/services`
- `GET /api/services/:id`
- `POST /api/services`
- `PUT /api/services/:id`
- `DELETE /api/services/:id`

### Users
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## 3) Response Contract

- `POST` and `GET by id`: `{ success, message, data }`
- `GET all`: `{ success, message, data: [] }`
- `PUT` and `DELETE`: `{ success, message }`
- API maps Mongo `_id` to `id` in responses.

## 4) Postman Validation

1. Import: `COMP229.W2026 - Assignment 2.postman_collection.json`.
2. Run all endpoints against `http://localhost:3000`.
3. Export run results JSON.
4. Save exported file to: `postman/assignment2-test-results.json`.

## 5) Render Deployment

1. Create a Render Web Service from this backend folder/repo.
2. Build command: `npm install`
3. Start command: `npm start`
4. Environment variables:
   - `MONGODB_URI` (Atlas connection string)
   - `NODE_ENV=production`
   - `PORT` (optional; Render injects this automatically)
5. Verify all collection requests against your Render URL.
