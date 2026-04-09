# Contributing

This repository is primarily structured as a reviewer-friendly backend project. If you want to extend it (or use it as a base), this guide keeps changes consistent and easy to review.

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`.

3. Start a database (Docker recommended):

```bash
docker compose up -d
```

4. Generate Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

5. Run the dev server:

```bash
npm run dev
```

## Quality Checks

- Typecheck: `npm run typecheck`
- Tests: `npm test`
- Build: `npm run build`
- All checks: `npm run check`

## Project Conventions

- Keep controllers thin; put domain logic in `src/services/`.
- Add Zod validation for any new endpoint inputs in `src/schemas/`.
- Use `ApiError` for expected failures; rely on centralized error middleware for formatting.
- Keep responses consistent using `sendSuccess`.

