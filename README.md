# AppForge Scaffold

Batteries-included Next.js 15 starter kit for internal and client projects. Pre-built integration modules for auth, payments, email, and storage — activate what you need, delete the rest.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5 strict |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | Drizzle ORM + Postgres 17 (Docker) |
| Auth | better-auth |
| Forms | React Hook Form + Zod |
| State | Zustand |

## Getting Started

```bash
# 1. Reset git history
rm -rf .git && git init && git add -A && git commit -m "initial commit"

# 2. Copy env vars (set ports, add BETTER_AUTH_SECRET)
cp .env.example .env.local

# 3. Start the database
docker compose up -d

# 4. Install dependencies
pnpm install

# 5. Push schema to DB
pnpm db:push

# 6. Seed demo user (optional)
pnpm db:seed

# 7. Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Demo login: `demo@appforge.com` / `demo1234`

## Integration Modules

All modules live in `integrations/`. The discovery agent activates chosen modules and deletes the rest.

| Category | Option A | Option B |
|---|---|---|
| Auth | `better-auth` | `supabase-auth` |
| Payments | `stripe` | `paddle` |
| Email | `resend` | `supabase-email` |
| Storage | `uploadthing` | `s3` |

## Project Structure

```
src/
  app/(marketing)/    Public pages (landing, pricing, about)
  app/(app)/          Authenticated pages — one folder per feature
  app/api/            API routes — folder name matches feature
  components/ui/      shadcn/ui base components
  components/blocks/  Full section blocks (hero, pricing, reviews…)
  components/layout/  Header, Footer, Sidebar
  db/schema/          Drizzle table definitions — one file per domain
  lib/                Utilities and third-party clients
  hooks/              Custom React hooks (use- prefix)
  types/              Shared TypeScript types
  config/             Site config and feature flags
integrations/         Pre-built modules (activated during setup)
drizzle/migrations/   Generated SQL migrations (committed to git)
```

## Scripts

```bash
pnpm dev            # Dev server
pnpm build          # Production build
pnpm lint           # ESLint
pnpm format         # Prettier

pnpm db:push        # Push schema to DB (dev only)
pnpm db:generate    # Generate migration files
pnpm db:migrate     # Run migrations
pnpm db:studio      # Open Drizzle Studio
pnpm db:seed        # Create demo user
```

## Claude Code Agents

Run `claude` in the project root, then talk to these agents:

| Say… | Agent | What it does |
|---|---|---|
| "Use the discovery agent" | `discovery` | Interviews you, sets up CLAUDE.md and feature roadmap |
| "Use the feature agent to build: X" | `feature` | Scaffolds route, page, components, API, types, hooks |
| "Use the component agent to create a X" | `component` | Builds a typed UI component |
| "Use the api-route agent to create the X endpoint" | `api-route` | Creates a typed, validated API route |

## Demo Mode

Set `DEMO_MODE=true` in `.env.local` to enable:

- Auto-created demo user on seed
- Magic links and verification emails show as toasts (no real email needed)
- "Sign in as demo" button on the sign-in page
- Dev panel in the bottom-right corner
