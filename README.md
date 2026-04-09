# Finance Backend API: Zorvyn Backend Developer Internship Assignment

A production-style finance backend built with `TypeScript`, `Express`, `PostgreSQL`, and `Prisma`, designed for secure financial record management, role-based access control, dashboard analytics, API documentation, and recruiter-friendly backend evaluation.

This project was built for the Zorvyn Backend Developer Internship assignment and focuses on backend engineering quality rather than frontend UI work.

## Why This Project Stands Out

- Modular layered backend structure with clear separation of routes, controllers, services, schemas, and utilities
- JWT authentication and role-based access control implemented at the API layer
- Financial record CRUD paired with filtering, pagination, search, and summary analytics
- Reviewer-friendly documentation through Swagger, Postman collection, setup instructions, and hosted links
- CI-ready repository with automated build and test workflow

## Live Review URL

This backend is also deployed for reviewer convenience:

- Hosted health check: `https://zorvyn-finance-backend-42za.onrender.com/api/health`
- Hosted Swagger docs: `https://zorvyn-finance-backend-42za.onrender.com/api/docs`

## Quick Start for Reviewers

Anyone can run this project locally by following the steps below.

### Prerequisites

- Node.js
- npm
- PostgreSQL or Docker

### Fastest Local Run

```bash
npm install
# Create .env from .env.example
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev
```

If you use Docker for PostgreSQL, start it first:

```bash
docker compose up -d
```

After the server starts, open:

- Health check: `http://localhost:5000/api/health`
- Swagger docs: `http://localhost:5000/api/docs`

For a more guided review flow, see `REVIEWER_GUIDE.md`.

## Features

### Authentication and Authorization

- JWT-based authentication
- Secure password hashing with `bcryptjs`
- Role-Based Access Control (`admin`, `analyst`, `viewer`)
- Protected route middleware
- Bearer token support in Swagger UI

### User Management

- First-admin registration flow
- Login and profile API
- Admin-only user creation
- User listing with pagination and search
- User role assignment and status updates
- UUID-based user identifiers

### Financial Records

- Create financial records
- List records with pagination
- Filter by type, category, and date range
- Search across title, category, and notes
- Update existing records
- Soft delete support
- Income / expense classification

### Dashboard Analytics

- Total income
- Total expenses
- Net balance
- Total record count
- Category-level breakdown
- Monthly trend-ready data
- Recent activity support

### API Documentation and Validation

- Interactive Swagger UI
- Zod-based request validation
- Consistent success / error response structure
- Reviewer-friendly setup flow
- Postman collection included for manual review

### Quality and Tooling

- TypeScript strict mode
- Prisma ORM with PostgreSQL
- Basic automated tests for health, docs, and auth protection using Jest and Supertest
- GitHub Actions CI for automated build and test checks
- Docker Compose for local PostgreSQL setup
- Clean modular folder structure

## Tech Stack

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Zod
- JWT
- Swagger UI
- Jest
- Supertest
- Docker Compose

## Project Structure

```text
zorvyn/
+-- prisma/
¦   +-- migrations/
¦   +-- schema.prisma
+-- src/
¦   +-- config/
¦   +-- controllers/
¦   +-- docs/
¦   +-- lib/
¦   +-- middlewares/
¦   +-- models/
¦   +-- routes/
¦   +-- schemas/
¦   +-- services/
¦   +-- types/
¦   +-- utils/
¦   +-- app.ts
¦   +-- server.ts
+-- tests/
+-- .env.example
+-- docker-compose.yml
+-- jest.config.cjs
+-- prisma.config.ts
+-- REVIEWER_GUIDE.md
+-- Zorvyn-Backend-Postman-Collection.json
+-- package.json
+-- package-lock.json
+-- README.md
```

## Local Setup

### 1. Create Environment File

Create a `.env` file using `.env.example`.

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/zorvyn_finance
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=*
```

### 2. Start PostgreSQL

If using Docker:

```bash
docker compose up -d
```

If using locally installed PostgreSQL, create a database named `zorvyn_finance` and update the password in `.env`.

### 3. Install Dependencies

```bash
npm install
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run Database Migration

```bash
npm run prisma:migrate -- --name init
```

### 6. Start Development Server

```bash
npm run dev
```

## Review URLs

Once the app is running:

- Health check: `http://localhost:5000/api/health`
- Swagger docs: `http://localhost:5000/api/docs`

Hosted review URLs:

- Health check: `https://zorvyn-finance-backend-42za.onrender.com/api/health`
- Swagger docs: `https://zorvyn-finance-backend-42za.onrender.com/api/docs`

## API Modules

### Auth

- `POST /api/auth/register-admin`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PATCH /api/users/:id`

### Records

- `GET /api/records`
- `GET /api/records/:id`
- `POST /api/records`
- `PATCH /api/records/:id`
- `DELETE /api/records/:id`

### Summaries

- `GET /api/summaries`

## Architecture Overview

The application follows a modular service-oriented Express structure:

- `routes/` defines HTTP endpoints and middleware composition
- `controllers/` handles request and response orchestration
- `services/` contains business logic and database-facing operations
- `schemas/` centralizes Zod validation for body, query, and params
- `middlewares/` enforces authentication, role checks, validation, and error handling
- `docs/` contains Swagger configuration for interactive API documentation
- `lib/` and `utils/` hold shared infrastructure helpers and reusable utilities

This structure keeps transport concerns separate from business logic and makes the codebase easier to extend, test, and review.

```mermaid
flowchart LR
    U[Client Apps<br/>Swagger / Postman / Frontend] --> R[Express Routes]
    R --> V[Validation Middleware]
    V --> A[Authentication Middleware]
    A --> RBAC[Role Authorization]
    RBAC --> C[Controllers]
    C --> S[Services]
    S --> P[Prisma ORM]
    P --> DB[(PostgreSQL)]
    C --> E[Centralized Error Handler]
    S --> RESP[API Response Builder]
    E --> OUT[JSON Response]
    RESP --> OUT
```

## Role Permissions Matrix

| Role | Users | Records | Summaries |
| --- | --- | --- | --- |
| `admin` | Full management access | Create, read, update, delete | Read |
| `analyst` | No access | Read | Read |
| `viewer` | No access | Read | Read |

```mermaid
flowchart TD
    Admin[Admin] --> U1[Manage Users]
    Admin --> R1[Create / Update / Delete Records]
    Admin --> S1[View Summaries]
    Analyst[Analyst] --> R2[Read Records]
    Analyst --> S2[View Summaries]
    Viewer[Viewer] --> R3[Read Records]
    Viewer --> S3[View Summaries]
```

## Validation and Error Strategy

- Request body, params, and query validation is handled with `Zod`
- Invalid input returns consistent API error responses with appropriate status codes
- Centralized error middleware normalizes unexpected failures
- Authentication and authorization are enforced before protected controller logic executes

## Assumptions and Trade-offs

- The project intentionally prioritizes backend quality, API design, and maintainability over frontend delivery
- A first-admin registration flow is used so the system can be initialized safely without open public signup
- Soft delete is applied to financial records to preserve recoverability and safer data handling
- JWT-based auth was chosen for simplicity and portability in a backend assignment setting
- Viewer access is implemented as read-only access to records and summaries, while mutating actions remain admin-only

## CI and Quality Checks

This repository includes a GitHub Actions workflow that runs on every push and pull request to `main`:

- `npm install`
- `npm test`
- `npm run build`

This adds a stronger engineering signal for interviews and makes the repository easier to trust during review.

## Recommended Review Flow

A reviewer can verify the project without any frontend by following this order:

1. `GET /api/health`
2. `POST /api/auth/register-admin`
3. `POST /api/auth/login`
4. Authorize with JWT token in Swagger
5. `POST /api/users`
6. `GET /api/users`
7. `POST /api/records`
8. `GET /api/records`
9. `GET /api/summaries`

## Testing

Run automated tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

## Reviewer Assets Included

- `REVIEWER_GUIDE.md`
- `ARCHITECTURE.md`
- `Zorvyn-Backend-Postman-Collection.json`
- Swagger docs at `/api/docs`
- `.env.example` for safe setup instructions

## Submission Notes

Upload these:

- `src/`
- `prisma/`
- `tests/`
- `.env.example`
- `README.md`
- `REVIEWER_GUIDE.md`
- `Zorvyn-Backend-Postman-Collection.json`
- `docker-compose.yml`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `jest.config.cjs`
- `prisma.config.ts`

Do not upload:

- `.env`
- `node_modules/`
- `dist/`
- real credentials or secrets

