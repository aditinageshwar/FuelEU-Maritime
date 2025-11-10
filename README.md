# FuelEU Maritime Compliance Platform

## Overview
This platform implements a Fuel EU Maritime compliance dashboard with a React frontend and Node.js backend. It manages vessel routes, calculates compliance balances (CB) based on fuel usage, handles banking transactions for CB credits/debits, and supports pooling for sharing CB among vessels. Built with Hexagonal Architecture (Clean Architecture) for maintainability, using TypeScript throughout. The backend uses Prisma for PostgreSQL access, and the frontend consumes APIs via Axios.

## Architecture Summary
- **Hexagonal Structure**:
  - **Core**: Domain entities (e.g., Route, ComplianceBalance), application use cases (e.g., CalculateComplianceBalance), and ports (interfaces for external dependencies).
  - **Adapters**: Inbound (HTTP controllers for API handling), outbound (PostgreSQL repositories), and UI (React components).
  - **Infrastructure**: Database config (Prisma), server (Express), and shared utilities/errors.
  - **Frontend**: React components in `adapters/ui/`, integrated with core via ports for API calls.
- **Separation of Concerns**: Domain is isolated; adapters depend on ports, enabling easy testing and framework swaps.
- **Data Flow**: Frontend UI triggers use cases via ports, which call outbound adapters for DB/API interactions.

## Setup & Run Instructions
1. **Prerequisites**: Node.js 18+, PostgreSQL, npm/yarn.
2. **Backend**:
   - `cd backend`
   - `npm install`
   - Create a PostgreSQL database (e.g., `fueleu`).
   - Update `backend/.env` with `DATABASE_URL="postgresql://username:password@localhost:5432/fueleu?schema=public"`.
   - `npm run db:migrate` (runs Prisma migrations to create tables).
   - `npm run db:generate` (generates Prisma client).
   - `npm run dev` (starts server on port 3001).
3. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm start` (starts dev server on port 3000; ensure backend is running for API calls).
4. **Full App**: Access the dashboard at `http://localhost:3000`. Backend APIs are at `http://localhost:3001/api/*`.

## How to Execute Tests
- **Backend**: `cd backend && npm test` (Jest unit/integration tests for use cases, repositories, and controllers).
- **Frontend**: `cd frontend && npm test` (Jest tests for components and hooks).
- **Integration**: Use Postman or curl for API testing (e.g., POST to `/api/routes`).

## Screenshots/Sample Requests
- **Dashboard Overview**: Displays routes table, CB meter (progress bar), and forms for creating routes, calculating CB, processing banking transactions, and creating poolings. Styled with TailwindCSS for responsiveness.
- **Sample API Requests**:
  - **Routes**: GET `/api/routes` → Returns `[{"id": "1", "vesselId": "V001", "startPort": "PortA", "endPort": "PortB", "fuelUsed": 100, "distance": 500}]`. POST `/api/routes` with body `{"vesselId": "V001", "startPort": "PortA", "endPort": "PortB", "fuelUsed": 100, "distance": 500}` → Creates a route.
  - **Compliance Balance**: POST `/api/compliance/calculate` with body `{"routeId": "1"}` → Returns `{"cb": 0.9}` (0-1 scale).
  - **Banking**: GET `/api/banking/V001` → Returns array of transactions. POST `/api/banking/transaction` with body `{"vesselId": "V001", "amount": 100, "type": "credit"}` → Processes transaction.
  - **Pooling**: GET `/api/pooling/V001` → Returns poolings for vessel. POST `/api/pooling` with body `{"fromVesselId": "V001", "toVesselId": "V002", "cbAmount": 0.1}` → Creates pooling.
- **Frontend Interactions**: Select a route to calculate CB (updates meter). Use forms to create routes/transactions (refreshes data via API).