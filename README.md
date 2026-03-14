# AppForge Scaffold

Your personal Next.js starter. Clone your GitHub repo, drop these files in, and run one command.

---

## Quickstart

```bash
# 1. Clone your new GitHub repo
git clone https://github.com/you/your-new-project
cd your-new-project

# 2. Unzip the scaffold into the folder (contents, not the folder itself)
# Then install all dependencies:
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Setup Checklist

After unzipping, go through `.env.example` and fill in what you need for your chosen stack.

### If you chose Prisma
```bash
npm run db:generate
npm run db:push
```

### If you chose Drizzle
```bash
npm run db:generate
npm run db:push
```

### If you chose shadcn/ui components
```bash
npx shadcn@latest init
# Then add components as needed:
npx shadcn@latest add button card input label
```

---

## Project Structure

```
src/
  app/
    (marketing)/        # Public pages: landing, pricing, about
    (app)/              # Authenticated app pages
    api/                # API routes
      ai/               # AI endpoints (if AI SDK selected)
      auth/             # Auth endpoints
  components/
    ui/                 # shadcn/ui base components
    blocks/             # Multi-component section blocks (Hero, Reviews, etc.)
    layout/             # Header, Footer, Sidebar, Nav
  lib/
    agents/             # Claude Code agent definitions
    prompts/            # AI prompt templates
    utils.ts            # cn(), formatDate(), formatCurrency(), slugify()
  hooks/                # Custom React hooks
  types/                # Global TypeScript types
  config/
    site.ts             # App name, URL, metadata
  styles/
    globals.css         # Tailwind + CSS variables (light/dark)
```

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format all files |
| `npm run db:push` | Push DB schema (Prisma or Drizzle) |
| `npm run db:studio` | Open DB GUI |
| `npm run db:generate` | Generate DB client |

---

## Using Claude Code Agents

This scaffold includes pre-configured agents in `.claude/agents/`. Start Claude Code from your project root:

```bash
claude
```

### Available Agents

**`discovery`** — Run this first on any new project
> Interviews you about your MVP, defines features, creates your CLAUDE.md, and outputs a prioritized feature roadmap.

**`feature`** — Use for each feature on your roadmap  
> Takes a single feature description and scaffolds the full implementation: route, component, API, types, and hooks.

**`api-route`** — Scaffold a new API endpoint  
> Creates a typed Next.js API route with error handling, validation, and response helpers.

**`component`** — Create a new UI component  
> Builds a typed, accessible component following your project conventions.

### How to use an agent

```bash
# In Claude Code, invoke an agent:
/agent discovery

# Or reference it in your prompt:
"Use the feature agent to build the user profile page"
```

---

## Component Blocks

Pre-built multi-component sections live in `src/components/blocks/`.
Each block category has multiple design variants (v1, v2, v3...).

To add a block to a page:
```tsx
import { ReviewsV2 } from '@/components/blocks/reviews'

export default function LandingPage() {
  return (
    <main>
      <ReviewsV2 />
    </main>
  )
}
```

Available block categories (add more via the `component` agent):
- `hero/` — Hero sections
- `reviews/` — Testimonial/review sections  
- `pricing/` — Pricing tables
- `cta/` — Call-to-action sections
- `features/` — Feature grids/lists
- `faq/` — FAQ sections

---

## Next Steps

1. Run `claude` and invoke the `discovery` agent
2. It will interview you and generate your `CLAUDE.md`
3. Work through your feature roadmap using the `feature` agent
