# Reviewer Guide

This project is a backend-only assignment and does not require a frontend application for evaluation.

## 60-Second Review (Hosted)

- Swagger docs: `https://zorvyn-finance-backend-42za.onrender.com/api/docs`
- Health check: `https://zorvyn-finance-backend-42za.onrender.com/api/health`

If you’re reviewing locally instead, follow the quick start below.

## Quick Local Review

1. Clone the repository
2. Create `.env` using `.env.example`
3. Start PostgreSQL (Docker or local)
4. Run:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev
```

5. Open:

- `http://localhost:5000/api/health`
- `http://localhost:5000/api/docs`

## Fastest Review Method

Use Swagger UI at `/api/docs`.

You can test the backend directly in the browser without building any frontend.

## Alternate Review Method

Import `Zorvyn-Backend-Postman-Collection.json` into Postman and run the requests in order.

## Suggested API Review Order

1. `GET /api/health`
2. `POST /api/auth/register-admin`
3. `POST /api/auth/login`
4. Authorize with JWT token
5. `POST /api/users`
6. `GET /api/users`
7. `POST /api/records`
8. `GET /api/records`
9. `GET /api/summaries`

## Docs Map (If You Want More Context)

- `ARCHITECTURE.md` — request flow, ER diagram, RBAC, trade-offs
- `DEPLOYMENT.md` — environment variables + migrations + deploy flow
- `OPERATIONS.md` — runbook/troubleshooting
- `DESIGN_NOTES.md` — scope, rationale, next improvements

