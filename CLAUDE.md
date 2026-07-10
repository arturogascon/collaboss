# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Collaboss — a Next.js 15 (App Router) app where users create dashboards containing "cards" (title, description, optional image). Auth is email/password via NextAuth v5 (beta). Data is stored in MySQL.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # next lint (eslint-config-next / core-web-vitals)
```

There is no test suite configured in this repo (no test script/framework present).

### Local database

MySQL runs via Docker Compose:

```bash
docker-compose up -d
```

This starts a `mysql:8` container named `mysql-local` on port 3306, using `DB_PASSWORD`/`DB_NAME` from the environment. The application itself hardcodes the schema name `collaboss` in `app/lib/db.ts` regardless of `DB_NAME`. Required env vars (see `.env.example`): `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `BASE_URL`, `BETTER_AUTH_SECRET` (used as the NextAuth secret despite the name). There is no migration tooling — schema must be created manually against the `collaboss` database (see table usage in `app/lib/db.ts` callers: `users`, `dashboards`, `cards`).

## Architecture

### Two parallel data-access paths — this is the main thing to know

- **Reads** go through internal API routes under `app/api/**/route.ts`, called via `fetch(process.env.BASE_URL + "/api/...")` from `app/utils/api/*.ts` (`cardApi.ts`, `dashboardApi.ts`). Even server components fetch these routes over HTTP using the absolute `BASE_URL` rather than calling `app/lib/db.ts` directly.
- **Writes** (create/edit card, create dashboard, auth) go through Server Actions in `app/utils/serverActions/*.ts`, marked `"use server"`, invoked directly from form `action` props, and finished with `revalidatePath(...)` to refresh the affected route. Card delete is the exception — it's a `DELETE` API route called via `fetch` from `cardApi.ts` (`deleteCard`).

When adding a new read, prefer an API route + fetch wrapper in `app/utils/api/`. When adding a new write, prefer a server action in `app/utils/serverActions/` that calls `revalidatePath` on the affected page.

### Database access

`app/lib/db.ts` exports a single `query<T>(sql, values)` helper that opens a **new** MySQL connection per call (via `mysql2/promise`), runs the query with named placeholders enabled, and closes the connection. There is no connection pool. All SQL is written by hand (no ORM); parameters are passed positionally (`?`) even though `namedPlaceholders` is set on the connection.

### Auth

- `auth.config.ts` defines the shared NextAuth config: sign-in page (`/login`), route-protection logic in the `authorized` callback, and a `redirect` callback that sends users to `/profile` after login unless a `callbackUrl` is present.
- `auth.ts` adds the `Credentials` provider (email/password checked against the `users` table via `bcrypt.compare`) and JWT/session callbacks that attach `user.id`.
- `middleware.ts` wraps `NextAuth(authConfig).auth` and only runs on the routes listed in its `matcher` (`/dashboard`, `/dashboard/create/:id`, `/profile`, `/login`, `/signup`). Route protection logic itself lives in `authConfig.callbacks.authorized`, not in the middleware file — the `isOnProtectedRoute` regex there is the actual gate, and it currently only matches `/profile` and `/dashboard`, not dashboard sub-routes like `/dashboard/[id]`.
- Server actions for auth (`signUp`, `logIn`, `logOut`) live in `app/utils/serverActions/authActions.ts`.

### Card image uploads

Handled inside the `createCard`/`editCard` server actions (`app/utils/serverActions/cardActions.ts`), not via an API route: the uploaded `File` is slugified and written directly to `public/images/` with `fs.createWriteStream`, and the resulting `/images/<file>` path is stored in the `cards.image` column.

### Route structure

- `app/dashboard/page.tsx` — list of a user's dashboards; `app/dashboard/[id]/page.tsx` — single dashboard (server component, fetches via `dashboardApi.ts`) rendering the client component `cardsAndForms.tsx`, which owns edit-form open/close state and maps cards to `components/card/card.tsx`.
- `app/user/[userId]/page.tsx` and `app/profile/page.tsx` are separate profile-related routes.
- `app/login/page.tsx` / `app/signup/page.tsx` use the auth server actions above.

### Styling

Tailwind CSS is the primary styling mechanism (`tailwind.config.ts` defines custom `purple`, `purple-light`, `green-light`, `green-dark` colors). One component (`app/components/card/card.tsx`) also uses a CSS Module (`card.module.css`).

### Path alias

`@/*` maps to the repo root (see `tsconfig.json`), e.g. `@/app/lib/db`, `@/auth`.
