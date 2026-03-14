import { isDemoMode } from '@/config/dev'
import { devNotifications } from '@/lib/dev-notifications'

export async function GET() {
  if (!isDemoMode) {
    return new Response(null, { status: 404 })
  }

  let unsubscribe: (() => void) | undefined
  let ping: ReturnType<typeof setInterval> | undefined

  const stream = new ReadableStream({
    start(controller) {
      unsubscribe = devNotifications.subscribe((notification) => {
        try {
          controller.enqueue(`data: ${JSON.stringify(notification)}\n\n`)
        } catch {
          // controller already closed — cancel will clean up
        }
      })

      ping = setInterval(() => {
        try {
          controller.enqueue(': ping\n\n')
        } catch {
          clearInterval(ping)
        }
      }, 30_000)
    },
    cancel() {
      clearInterval(ping)
      unsubscribe?.()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
