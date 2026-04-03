# GitHub Push Guide

This file is for safely uploading this assignment project to GitHub.

## Before Push

Make sure these are true:

- `.env` is not uploaded
- `node_modules` is not uploaded
- `dist` is not uploaded
- your real database password is not visible anywhere
- project builds successfully
- tests pass successfully

Run these commands once before pushing:

```bash
npm run build
npm test
```

## Files That Should Be In GitHub

Upload these:

- `src/`
- `prisma/`
- `tests/`
- `.env.example`
- `.gitignore`
- `README.md`
- `REVIEWER_GUIDE.md`
- `Zorvyn-Backend-Postman-Collection.json`
- `docker-compose.yml`
- `jest.config.cjs`
- `package.json`
- `package-lock.json`
- `prisma.config.ts`
- `tsconfig.json`

## Files That Must Not Be In GitHub

Do not upload these:

- `.env`
- `node_modules/`
- `dist/`
- any personal passwords or tokens

## Reviewer Convenience

A reviewer can evaluate this backend without any frontend by using:

- Swagger docs at `/api/docs`
- `REVIEWER_GUIDE.md`
- `Zorvyn-Backend-Postman-Collection.json`

## Git Commands To Push

Open terminal inside the project folder and run:

```bash
git init
git add .
git commit -m "Add Zorvyn backend assignment project"
```

Then create a new empty repository on GitHub and run:

```bash
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Example:

```bash
git remote add origin https://github.com/yourusername/zorvyn-backend.git
git push -u origin main
```

## Recommended Repository Name

Use something clean like:

- `zorvyn-backend-assignment`
- `finance-backend-rbac`
- `zorvyn-finance-backend`

## Suggested GitHub Repository Description

`TypeScript backend assignment using Express, PostgreSQL, Prisma, JWT auth, RBAC, Swagger, and tests.`

## Suggested README Line For Recruiter

`This project is a TypeScript-based finance backend built with Express, PostgreSQL, and Prisma. It includes JWT authentication, role-based access control, Swagger documentation, and automated tests.`

## Final Check Before Submission

- Swagger opens at `/api/docs`
- Health check works at `/api/health`
- Admin registration works
- Login works
- Users API works
- Records API works
- Summary API works
- `.env` is not pushed
