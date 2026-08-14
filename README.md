# Collaboss

Collaboss is a platform for creating and sharing collaborative dashboards. Create a dashboard for any group effort and let people add cards to it — for example, a picnic dashboard where everyone lists what they're bringing, or a Karaoke Night dashboard where everyone signs up with the song they'll sing.

Each dashboard is made up of cards (a title, a description, and an optional image), which anyone with access can add, edit, or remove. It's a lightweight way to coordinate a group without spreadsheets or group chats.

## Features

- Sign up / log in with email and password
- Create dashboards for any collaborative event or list, with a description and color
- Add, edit, and delete cards on a dashboard, with optional images and colors
- Personal profile and dashboard overview per user

## Getting Started

### Prerequisites

- Node.js
- Docker (for the local PostgreSQL database) — on Windows and macOS this means **Docker Desktop must be running** before you use `docker-compose`/`docker`; the CLI commands below will fail to connect otherwise.

### 1. Set up the database

Copy `.env.example` to `.env` and fill in the values:

- `DB_USER`, `DB_PASSWORD`, `DB_NAME` — credentials for the local Postgres container started by `docker-compose.yml`.
- `DATABASE_URL` — the connection string the app and the migration runner actually connect with. For local dev, point it at the container above, e.g. `postgresql://<DB_USER>:<DB_PASSWORD>@localhost:5433/<DB_NAME>` (port `5433` is what `docker-compose.yml` maps to the container's `5432`, chosen to avoid clashing with a Postgres already installed on `5432`). In production this points at a hosted database instead — this project's Vercel deployment uses [Neon](https://neon.tech/) (see [Deployment](#deployment)).
- `BASE_URL` — used by server components to call this app's own `/api/*` routes.
- `AUTH_SECRET` — picked up automatically by NextAuth v5/Auth.js as the session/JWT signing secret; generate one with `npx auth secret`.

Start PostgreSQL:

```bash
docker-compose up -d
```

This starts a PostgreSQL 18 container (`postgres-local`), reachable at `localhost:5433`.

Then create the schema by running the migrations with [node-pg-migrate](https://salsita.github.io/node-pg-migrate/):

```bash
npm run migrate:up
```

This applies every SQL file in [`db/migrations`](db/migrations), in order, against `DATABASE_URL`. Each file is a plain-SQL migration split into an `-- Up Migration` section and a `-- Down Migration` section. `npm run migrate:down` rolls back the most recently applied migration, and `npm run migrate:create <name>` scaffolds a new one.

### 2. Install dependencies and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project deploys to [Vercel](https://vercel.com/), backed in production by a [Neon](https://neon.tech/) PostgreSQL database. To point a deployment at your own database:

1. Create a Neon project and copy its connection string as `DATABASE_URL` — Neon's connection strings include `sslmode=require`, which `pg` respects automatically, so no extra SSL config is needed in code.
2. Set `DATABASE_URL`, `BASE_URL` (the deployment's own URL, e.g. `https://<your-app>.vercel.app`), and `AUTH_SECRET` as environment variables in the Vercel project settings.
3. Run the migrations against Neon before traffic hits the deployment — there's no migration step wired into the Vercel build, so run it from your machine: `DATABASE_URL=<neon-connection-string> npm run migrate:up`.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) with React and TypeScript
- [NextAuth](https://authjs.dev/) for authentication (credentials-based, with bcrypt password hashing)
- PostgreSQL via [node-postgres (pg)](https://node-postgres.com/), with schema migrations managed by [node-pg-migrate](https://salsita.github.io/node-pg-migrate/)
- [Zod](https://zod.dev/) for server action input validation
- [Tailwind CSS](https://tailwindcss.com/) for styling
