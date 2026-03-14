# AppForge Scaffold

> Batteries-included Next.js 15 starter kit for internal and client projects.
> All integration modules are pre-built. During the discovery phase, choose which
> ones to activate — the rest get deleted.

---

## Tech Stack (Base)

| Layer | Choice |
|---|---|
| Framework | Next.js 15.5.12 (App Router) |
| Language | TypeScript 5.x (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database ORM | Drizzle ORM + postgres driver |
| Local DB | Docker Compose (Postgres 17) |
| State | Zustand |
| Forms | React Hook Form + Zod + @hookform/resolvers |
| Icons | lucide-react |
| Fonts | Geist Sans + Geist Mono |

---

## Integration Modules

All modules live in `integrations/`. During setup, the discovery agent activates
chosen modules (copies to `src/`) and deletes the rest.

| Category | Option A | Option B |
|---|---|---|
| Auth | `better-auth` (recommended) | `supabase-auth` |
| Payments | `stripe` | `paddle` |
| Email | `resend` | `supabase-email` |
| Storage | `uploadthing` | `s3` |

---

## Local Development

```bash
# 1. Start local database
docker compose up -d

# 2. Copy env file
cp .env.example .env.local

# 3. Install dependencies
pnpm install

# 4. Push schema to DB
pnpm db:push

# 5. Start dev server
pnpm dev
```

---

## Database Commands

```bash
pnpm db:generate   # generate SQL migration files
pnpm db:migrate    # run migrations
pnpm db:push       # push schema directly (dev only)
pnpm db:studio     # open Drizzle Studio (table viewer)
pnpm db:seed       # run seed script
```

---

## Folder Conventions

```
src/app/(marketing)/     Public pages (landing, pricing, about)
src/app/(app)/           Authenticated pages — each folder = one feature
src/app/api/             API routes — folder name matches feature name
src/components/ui/       shadcn/ui base components (don't modify directly)
src/components/blocks/   Full section blocks (hero/, reviews/, pricing/, etc.)
src/components/layout/   Header, Footer, Sidebar, Nav
src/db/                  Drizzle schema + client
src/db/schema/           Table definitions — one file per domain
src/lib/                 Utilities, helpers, 3rd party clients
src/hooks/               Custom React hooks (prefix: use-)
src/types/               TypeScript types (index.ts + per-feature files)
src/config/              Site config, nav config, feature flags

integrations/            Pre-built integration modules (activate during setup)
integrations/auth/       Auth modules: better-auth, supabase-auth
integrations/payments/   Payment modules: stripe, paddle
integrations/email/      Email modules: resend, supabase-email
integrations/storage/    Storage modules: uploadthing, s3
drizzle/migrations/      Generated SQL migration files (committed to git)
```

---

## Code Style Rules

- **TypeScript:** Strict mode. No `any`. Use `unknown` and narrow.
- **Imports:** Always use `@/` alias. Never relative imports that go up more than one level.
- **Components:** Named exports only (except pages and layouts).
- **Classes:** Always use `cn()` from `@/lib/utils` for conditional class merging.
- **Async:** Always `async/await`. Never `.then()` chains.
- **Error handling:** Always wrap API calls in try/catch. Log with context: `console.error('[handler name]', error)`.
- **Component size:** Keep under 150 lines. Split if larger.
- **Server vs Client:** Default to server components. Only add `'use client'` when you need interactivity or browser hooks.

---

## API Conventions

All API routes return `ApiResponse<T>` from `@/types`:

```ts
// Success
return NextResponse.json<ApiResponse<T>>({ data: result })

// Error
return NextResponse.json<ApiResponse>({ error: 'Message' }, { status: 400 })
```

---

## Discovery Agent Flow

When starting a new project from this scaffold:

1. Run `claude` in the project directory
2. Tell Claude: "Use the discovery agent"
3. Answer questions about the project
4. Agent activates chosen integrations, removes others, updates CLAUDE.md
5. Follow `setup/SETUP.md` generated for your chosen stack

---

## Agent Commands

```bash
# Start a new session
claude

# Run the discovery flow
# Tell Claude: "Use the discovery agent"

# Build a feature
# Tell Claude: "Use the feature agent to build: [Feature Name]"

# Create a component
# Tell Claude: "Use the component agent to create a [name] component"

# Add an API route
# Tell Claude: "Use the api-route agent to create the [resource] endpoint"
```
