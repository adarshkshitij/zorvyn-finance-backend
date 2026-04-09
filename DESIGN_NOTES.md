# Design Notes

This file captures the “why” behind the implementation choices, with the goal of making the repo easier to evaluate in interviews and faster to extend.

## Scope and Intent

- This is a backend-only project by design (assignment scope and evaluation focus).
- The goal is to demonstrate maintainability and engineering judgment more than feature breadth.

## Key Decisions

### Layered Structure

The API follows a consistent flow:

`routes → middlewares (validate/auth/RBAC) → controllers → services → Prisma → PostgreSQL`

This keeps controllers thin and makes business logic easier to test and evolve.

### Authentication and RBAC

- JWTs are used for portability and straightforward local review.
- RBAC is enforced at the API layer (not “frontend-only”), keeping permissions auditable.
- Roles: `admin`, `analyst`, `viewer`

### First Admin Bootstrap

The `register-admin` endpoint is intentionally a one-time bootstrap:

- Allows initializing the system safely without public signups.
- Keeps the assignment focused without introducing a full invitation flow.

### Soft Deletes for Financial Records

Records are soft-deleted (`isDeleted`) to reduce risk during admin operations and keep the domain behavior safer by default.

## Validation and Error Handling

- Zod validates body/query/params before controller logic runs.
- Errors are normalized by centralized middleware for consistent responses.
- Known Prisma error cases are mapped to friendly status codes/messages where helpful.

## Trade-offs / What’s Next (If Iterating Further)

- Add deeper integration tests around auth + record CRUD + summaries.
- Add rate limiting for auth-sensitive endpoints.
- Add refresh tokens or session revocation strategy if product requirements demand it.
- Add audit logging for sensitive admin actions.
- Add metrics/structured logs for production observability.

