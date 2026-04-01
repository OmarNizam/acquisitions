# Acquisitions API

![](https://img.shields.io/badge/Node.js-18%2B-brightgreen?style=flat-square)

A production-grade Express.js + TypeScript (strict) API with Supabase authentication, Drizzle ORM, and PostgreSQL. Built for maintainability, security, and DevOps best practices.

---

## Features

- **Express.js** (TypeScript strict mode)
- **Supabase** for authentication and PostgreSQL
- **Drizzle ORM** for type-safe database access
- **Zod** for validation
- **Centralized error handling**
- **Docker** & **Kubernetes** ready
- **GitHub Actions** for CI/CD

---

## Getting Started

### 1. Clone & Install

```sh
git clone https://github.com/OmarNizam/acquisitions.git
cd acquisitions
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase and Postgres credentials:

```
PGHOST=...
PGPORT=5432
PGDATABASE=...
PGUSER=...
PGPASSWORD=...
PGSSLMODE=require
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 3. Database Migrations

Generate and apply migrations:

```sh
npm run db:generate
# Then apply the generated SQL to Supabase using psql or the dashboard
```

### 4. Run the App

```sh
npm run dev
```

---

## Usage

- **Login Route:** `POST /login` with `Authorization: Bearer <SUPABASE_JWT>`
- **User logging:** Logs user logins to the console (customize as needed)

---

## DevOps

- **Docker:**
  - Build: `docker build -t acquisitions .`
  - Run: `docker run -p 3000:3000 acquisitions`
- **Kubernetes:** See `/k8s` for manifests (if present)
- **CI/CD:** See `.github/workflows/` for GitHub Actions

---

## Contributing

PRs welcome! Please lint and test before submitting.

---

## License

MIT
