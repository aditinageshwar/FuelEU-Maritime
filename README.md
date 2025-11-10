
---

### README.md

```markdown
# FuelEU Maritime Compliance Platform

## Overview
This platform implements a Fuel EU Maritime compliance dashboard with frontend (React) and backend (Node.js) APIs. It handles route data, compliance balance (CB), banking, and pooling, using Hexagonal Architecture for clean separation of concerns. Data is seeded with sample routes, and calculations follow Fuel EU formulas.

## Architecture Summary
- **Hexagonal Structure**: Core (domain entities, use-cases, ports) is framework-agnostic. Adapters handle UI (React) and infrastructure (PostgreSQL via Prisma). Ports invert dependencies.
- **Frontend**: React components in `adapters/ui/`, calling outbound ports for API interactions.
- **Backend**: Express routes in `adapters/inbound/http/`, with outbound adapters for DB access.

## Setup & Run Instructions
1. **Prerequisites**: Node.js 18+, PostgreSQL, npm/yarn.
2. **Backend**:
   - `cd backend`
   - `npm install`
   - Set up PostgreSQL DB, update `.env` with connection string.
   - `npx prisma migrate dev` (seeds sample data).
   - `npm run dev` (runs on port 3001).
3. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm start` (runs on port 3000, proxies to backend).
4. **Tests**: `npm test` in both dirs (Jest for unit tests).

## How to Execute Tests
- Backend: `npm test` runs tests for use-cases (e.g., CB calculation) and adapters.
- Frontend: `npm test` runs component and hook tests.
- Integration: Use Postman for API endpoints (e.g., GET /routes).

## Screenshots/Sample Requests
- **Routes Tab**: Table with filters; sample API: `GET /routes` returns JSON array of routes.
- **Compare Tab**: Chart comparing intensities; sample: `GET /routes/comparison` returns baseline vs. others with % diff.
- **Banking Tab**: KPIs display; sample POST: `{ "shipId": "S001", "year": 2024, "amount": 1000 }` to `/banking/bank`.
- **Pooling Tab**: Member list; sample POST to `/pools`: `{ "year": 2024, "members": [{"shipId": "S001", "cb": -500}, {"shipId": "S002", "cb": 600}] }`.