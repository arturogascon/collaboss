# Collaboss

Collaboss is a platform for creating and sharing collaborative dashboards. Create a dashboard for any group effort and let people add cards to it — for example, a picnic dashboard where everyone lists what they're bringing, or a Karaoke Night dashboard where everyone signs up with the song they'll sing.

Each dashboard is made up of cards (a title, a description, and an optional image), which anyone with access can add, edit, or remove. It's a lightweight way to coordinate a group without spreadsheets or group chats.

## Features

- Sign up / log in with email and password
- Create dashboards for any collaborative event or list
- Add, edit, and delete cards on a dashboard, with optional images
- Personal profile and dashboard overview per user

## Getting Started

### Prerequisites

- Node.js
- Docker (for the local MySQL database)

### 1. Set up the database

Copy `.env.example` to `.env` and fill in the values (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `BASE_URL`, `BETTER_AUTH_SECRET`), then start MySQL:

```bash
docker-compose up -d
```

This starts a MySQL 8 container on port 3306. The app connects to a database named `collaboss`, so make sure that schema exists with `users`, `dashboards`, and `cards` tables before running the app.

### 2. Install dependencies and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) with React and TypeScript
- [NextAuth](https://authjs.dev/) for authentication (credentials-based, with bcrypt password hashing)
- MySQL via [mysql2](https://github.com/sidorares/node-mysql2)
- [Tailwind CSS](https://tailwindcss.com/) for styling
