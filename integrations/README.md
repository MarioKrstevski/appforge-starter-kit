# Integration Modules

Each folder is a self-contained integration module. During the discovery phase,
the Claude agent asks which integrations you need, copies the chosen module files
into `src/`, merges `.env.example` additions, and deletes the rest.

## Structure

Each module contains:
- `src/` — files to copy into the project's `src/`
- `db/` — Drizzle schema additions (append to `src/db/schema/`)
- `.env.example` — environment variables needed
- `SETUP.md` — step-by-step setup instructions for the service

## Available Modules

| Category | Module | Description |
|---|---|---|
| Auth | `auth/better-auth` | Self-hosted auth, TypeScript-first |
| Auth | `auth/supabase-auth` | Supabase managed auth |
| Payments | `payments/stripe` | Stripe checkout + webhooks |
| Payments | `payments/paddle` | Paddle billing + webhooks |
| Email | `email/resend` | Transactional email via Resend |
| Email | `email/supabase-email` | Email via Supabase SMTP |
| Storage | `storage/uploadthing` | File uploads via Uploadthing |
| Storage | `storage/s3` | File uploads via AWS S3 |
