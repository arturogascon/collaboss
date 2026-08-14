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

Copy `.env.example` to `.env` and fill in the values (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `BASE_URL`, `BETTER_AUTH_SECRET`), then start PostgreSQL:

```bash
docker-compose up -d
```

This starts a PostgreSQL 16 container (`postgres-local`) on port 5432. There is no migration runner in this project — the app connects to a database named `collaboss`, and its schema (`users`, `dashboards`, `cards` tables) must be created by hand-running the SQL files in [`db/migrations`](db/migrations) in numeric order, e.g.:

```bash
docker exec -i postgres-local psql -U "$DB_USER" -d collaboss < db/migrations/0001_create_users_table.sql
```

See [`db/migrations/README.md`](db/migrations/README.md) for the full list of files and run order.

### 2. Install dependencies and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) with React and TypeScript
- [NextAuth](https://authjs.dev/) for authentication (credentials-based, with bcrypt password hashing)
- PostgreSQL via [node-postgres (pg)](https://node-postgres.com/)
- [Zod](https://zod.dev/) for server action input validation
- [Tailwind CSS](https://tailwindcss.com/) for styling
