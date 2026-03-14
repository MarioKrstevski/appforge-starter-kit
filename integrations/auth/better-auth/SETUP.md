# Better Auth Setup

## 1. Install dependencies

Already included in package.json.

## 2. Set environment variables

Add to `.env.local`:
\`\`\`
BETTER_AUTH_SECRET=<run: openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:3000
\`\`\`

## 3. Add social providers (optional)

For each provider you want, add to `.env.local`:
\`\`\`
# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
\`\`\`
Then enable them in `src/lib/auth.ts`.

## 4. Generate and run database migration

\`\`\`bash
npx better-auth generate   # generates Drizzle schema
npm run db:push            # applies to database
\`\`\`

## 5. Configure your chosen email provider

Magic links need an email sender. Wire up your email integration in `src/lib/auth.ts`.
