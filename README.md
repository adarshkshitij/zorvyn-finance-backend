# Finance Ledger Backend (API)

A production-style finance backend API built with `TypeScript`, `Express`, `PostgreSQL`, and `Prisma`.
It’s designed to be reviewer-friendly: clear layering, practical auth/RBAC, consistent validation + error handling, and Swagger-first API exploration.

Portfolio project (backend-focused by design).

## At a Glance (1–2 minutes)

- **What it does:** Auth + RBAC + user management + financial record CRUD + dashboard-style summaries
- **Where to start (review):** `REVIEWER_GUIDE.md`
- **Key docs:** `ARCHITECTURE.md`, `DEPLOYMENT.md`, `OPERATIONS.md`, `DESIGN_NOTES.md`
- **Main entry points:** `src/server.ts` (boot), `src/app.ts` (Express app), `prisma/schema.prisma` (data model)
- **Optional: Hosted (if deployed):**
  - Health: `https://your-deployment.example.com/api/health`
  - Swagger: `https://your-deployment.example.com/api/docs`

## Why This Project Stands Out

- Modular layered backend structure with clear separation of routes, controllers, services, schemas, and utilities
- JWT authentication and role-based access control implemented at the API layer
- Financial record CRUD paired with filtering, pagination, search, and summary analytics
- Reviewer-friendly documentation: Swagger, Postman collection, and guided review flow
- CI workflow that runs `typecheck`, `test`, and `build` on every PR

## Quick Start for Reviewers

### Prerequisites

- Node.js (>= 20)
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

For a guided “review journey”, see `REVIEWER_GUIDE.md`.

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
- Postman collection included for manual review

### Quality and Tooling

- TypeScript strict mode
- Prisma ORM with PostgreSQL
- Automated tests for key infrastructure behavior (health/docs/auth guard) using Jest + Supertest
- GitHub Actions CI for typecheck, test, and build
- Docker Compose for local PostgreSQL setup

## Tech Stack

- TypeScript, Node.js, Express.js
- PostgreSQL + Prisma
- Zod, JWT, Swagger UI
- Jest + Supertest
- Docker Compose (local DB)

## Project Structure

```text
finance-ledger-backend/
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server entry point
│   ├── routes/               # Endpoint definitions (path + middleware)
│   ├── controllers/          # Request/response orchestration
│   ├── services/             # Business logic + Prisma queries
│   ├── middlewares/          # Auth, RBAC, validation, error handling
│   ├── schemas/              # Zod validation schemas
│   ├── docs/                 # Swagger configuration
│   ├── config/               # Environment and app config
│   ├── lib/                  # Shared infrastructure helpers
│   ├── utils/                # Reusable utilities
│   └── types/                # Shared TypeScript types
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Migration history
├── tests/                    # Automated API and infrastructure checks
├── .github/workflows/        # CI workflow
├── ARCHITECTURE.md           # Architecture and design notes
├── REVIEWER_GUIDE.md         # Reviewer-focused quick start
├── DEPLOYMENT.md             # Deployment notes (Render-friendly)
├── OPERATIONS.md             # Runbook/troubleshooting
├── DESIGN_NOTES.md           # Scope, trade-offs, and next steps
├── docker-compose.yml        # Local PostgreSQL setup
├── .env.example              # Safe environment template
└── README.md                 # Overview + setup + review map
```

```mermaid
flowchart TD
    ROOT[repo root] --> SRC[src]
    ROOT --> PRISMA[prisma]
    ROOT --> TESTS[tests]
    ROOT --> CI[.github/workflows]
    ROOT --> DOCS["docs (*.md)"]
    SRC --> ROUTES[routes]
    SRC --> CONTROLLERS[controllers]
    SRC --> SERVICES[services]
    SRC --> MIDDLEWARES[middlewares]
    SERVICES --> ORM[Prisma ORM]
    ORM --> DB[(PostgreSQL)]
```

## Local Setup

### 1. Create Environment File

Create a `.env` file using `.env.example`.

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/finance_ledger
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=*
```

### 2. Start PostgreSQL

If using Docker:

```bash
docker compose up -d
```

If using locally installed PostgreSQL, create a database named `finance_ledger` and update the password in `.env`.

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

Optional hosted URLs (if you deploy this API):

- Health check: `https://your-deployment.example.com/api/health`
- Swagger docs: `https://your-deployment.example.com/api/docs`

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

The application follows a modular, service-oriented Express structure:

- `routes/` defines endpoint paths + middleware composition
- `controllers/` stay lightweight and orchestrate requests/responses
- `services/` hold business logic and Prisma queries
- `schemas/` centralize Zod validation for body/query/params
- `middlewares/` enforce auth, RBAC, validation, and consistent errors

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

For deeper details (request flow, ER diagram, access control), see `ARCHITECTURE.md`.

## Role Permissions Matrix

| Role | Users | Records | Summaries |
| --- | --- | --- | --- |
| `admin` | Full management access | Create, read, update, delete | Read |
| `analyst` | No access | Read | Read |
| `viewer` | No access | Read | Read |

## Validation and Error Strategy

- Request body, params, and query validation is handled with `Zod`
- Invalid input returns consistent API error responses with appropriate status codes
- Centralized error middleware normalizes unexpected failures
- Authentication and authorization run before protected controller logic executes

## Assumptions and Trade-offs

- Backend-only by design (assignment scope: backend quality + maintainability)
- First-admin registration initializes the system without open public signup
- Soft delete for financial records (safer than hard deletes for admin flows)
- JWT-based auth chosen for portability and simplicity

## CI and Quality Checks

GitHub Actions runs on every push and pull request to `main`:

- `npm run typecheck`
- `npm test`
- `npm run build`

## Recommended Review Flow

1. `GET /api/health`
2. `POST /api/auth/register-admin`
3. `POST /api/auth/login`
4. Authorize with JWT token in Swagger
5. `POST /api/users`
6. `GET /api/users`
7. `POST /api/records`
8. `GET /api/records`
9. `GET /api/summaries`

```mermaid
flowchart LR
    A[GitHub Repository] --> B[README / Reviewer Guide]
    B --> C[Hosted Swagger Docs]
    C --> D[Register First Admin]
    D --> E[Login and Authorize]
    E --> F[Test Users APIs]
    F --> G[Test Records APIs]
    G --> H[Test Summary APIs]
```

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
- `Finance-Ledger-API.postman_collection.json`
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
- `Finance-Ledger-API.postman_collection.json`
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
