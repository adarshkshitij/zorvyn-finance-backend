# Operations / Runbook

This document is written for a reviewer (or future maintainer) who wants to run, debug, or verify the service quickly.

## Quick Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Start (prod): `npm start`
- Typecheck + tests + build: `npm run check`
- Tests only: `npm test`

## Health + Docs

- Health endpoint: `GET /api/health`
- Swagger UI: `GET /api/docs`

The health response includes environment and a timestamp to make deployments easier to validate.

## Logs

- HTTP logs: `morgan` (uses `dev` format in development and `combined` in production)
- Application errors: centralized error middleware

In non-test environments, unhandled errors are logged to stderr by the error middleware.

## CORS

CORS is controlled via `CLIENT_ORIGIN`:

- `CLIENT_ORIGIN=*` allows all origins
- otherwise, provide a comma-separated list (e.g., `https://a.com,https://b.com`)

## Auth Troubleshooting

Symptoms and likely causes:

- `401 Authorization token is required.`: missing `Authorization: Bearer <token>`
- `401 Invalid authentication token.`: token corrupted or signed with a different `JWT_SECRET`
- `401 Authentication token has expired.`: token TTL exceeded (see `JWT_EXPIRES_IN`)
- `403 Inactive users cannot access this resource.`: user status is not `active`

## Database Troubleshooting

- Confirm `DATABASE_URL` is set and points to the correct database.
- For local Docker DB, use `docker compose up -d` and verify port `5432` is free.
- If migrations fail, ensure the database user has permissions to create tables/indexes.

## Error Responses

All errors are normalized to a consistent JSON shape:

- `success: false`
- `message`
- `errors` (optional structured details)

In non-production environments, a stack trace is included to help debugging.

