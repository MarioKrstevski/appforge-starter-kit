export async function register() {
  // Only run in Node.js runtime (not edge), only in demo mode
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.DEMO_MODE !== 'true') return

  const { seedDemoUser } = await import('@/db/seed')
  await seedDemoUser()
}
