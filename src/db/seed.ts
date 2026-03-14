import { db } from '@/db'
import { user } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'

const DEMO_EMAIL = 'demo@appforge.com'
const DEMO_PASSWORD = 'demo1234'
const DEMO_NAME = 'Demo User'

export async function seedDemoUser() {
  const existing = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, DEMO_EMAIL))
    .limit(1)

  if (existing.length > 0) {
    console.log('[seed] Demo user already exists — skipping')
    return
  }

  try {
    await auth.api.signUpEmail({
      body: { email: DEMO_EMAIL, password: DEMO_PASSWORD, name: DEMO_NAME },
    })

    // Mark email as verified so the demo user can sign in immediately
    await db
      .update(user)
      .set({ emailVerified: true })
      .where(eq(user.email, DEMO_EMAIL))

    console.log(`[seed] Demo user created: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`)
  } catch (error) {
    console.error('[seed] Failed to create demo user', error)
  }
}

// Allow running directly: pnpm db:seed
// Guard prevents this from running when imported by instrumentation.ts
const isDirectRun = process.argv[1]?.includes('seed')
if (isDirectRun) {
  seedDemoUser().then(() => process.exit(0))
}
