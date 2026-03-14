// ─── Dev / Demo mode config ───────────────────────────────────────────────────
// Toggle DEMO_MODE=true in .env.local to enable the full dev experience:
//  - Demo user auto-created on startup (demo@appforge.com / demo1234)
//  - Magic links and verification emails appear as toasts instead of real emails
//  - "Sign in as demo" button on the sign-in page
//  - Demo mode banner and dev panel visible in the UI

export const isDemoMode = process.env.DEMO_MODE === 'true'
