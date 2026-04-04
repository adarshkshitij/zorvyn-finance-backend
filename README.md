# Finance Backend API: Zorvyn Backend Developer Internship Assignment

A production-style finance backend built with `TypeScript`, `Express`, `PostgreSQL`, and `Prisma`, designed for secure financial record management, role-based access control, dashboard analytics, API documentation, and recruiter-friendly backend evaluation.

This project was built for the Zorvyn Backend Developer Internship assignment and focuses on backend engineering quality rather than frontend UI work.

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
cp .env.example .env
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
- Automated tests using Jest and Supertest
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

