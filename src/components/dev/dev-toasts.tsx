'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import type { DevNotification } from '@/lib/dev-notifications'

export function DevToasts() {
  useEffect(() => {
    const es = new EventSource('/api/dev/notifications')

    es.onmessage = (event) => {
      try {
        const n = JSON.parse(event.data) as DevNotification

        if (n.type === 'magic-link') {
          toast('🔗 Magic Link Ready', {
            description: `Sign-in link for ${n.email}`,
            duration: Infinity,
            action: {
              label: 'Click to sign in',
              onClick: () => { window.location.href = n.url },
            },
          })
        } else if (n.type === 'verification') {
          toast('✉️ Verification Link Ready', {
            description: `Verify email for ${n.email}`,
            duration: Infinity,
            action: {
              label: 'Verify now',
              onClick: () => { window.location.href = n.url },
            },
          })
        }
      } catch {
        // ignore malformed events
      }
    }

    return () => es.close()
  }, [])

  return null
}
