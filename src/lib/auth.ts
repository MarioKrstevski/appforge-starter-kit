import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink } from 'better-auth/plugins'
import { db } from '@/db'
import * as schema from '@/db/schema'
import { isDemoMode } from '@/config/dev'
import { devNotifications } from '@/lib/dev-notifications'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      if (isDemoMode) {
        devNotifications.add({
          type: 'verification',
          email: user.email,
          url,
          createdAt: new Date(),
        })
        return
      }
      // Production: wire up your email integration here
      console.warn('[auth] sendVerificationEmail not configured for production')
    },
  },

  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        if (isDemoMode) {
          devNotifications.add({ type: 'magic-link', email, url, createdAt: new Date() })
          return
        }
        // Production: wire up your email integration here
        console.warn('[auth] sendMagicLink not configured for production')
      },
    }),
  ],
})
