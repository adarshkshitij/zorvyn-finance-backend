# Reviewer Guide

This project is a backend-only assignment and does not require a frontend application for evaluation.

## How To Review Quickly

1. Clone the repository
2. Create `.env` using `.env.example`
3. Start PostgreSQL locally or via Docker
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

You can test the backend directly in browser without building any frontend.

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

## Notes

- This project uses `TypeScript + Express + PostgreSQL + Prisma`
- Swagger is included for easier API review
- Automated tests are included
- `.env` should not be committed; use `.env.example` for setup
