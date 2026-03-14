// In-memory notification queue for demo mode.
// Uses a global variable so it survives Next.js hot reloads in development.

export type DevNotification =
  | { type: 'magic-link'; email: string; url: string; createdAt: Date }
  | { type: 'verification'; email: string; url: string; createdAt: Date }

type Subscriber = (notification: DevNotification) => void

const g = global as typeof global & {
  __devNotifications?: DevNotification[]
  __devSubscribers?: Set<Subscriber>
}

if (!g.__devNotifications) g.__devNotifications = []
if (!g.__devSubscribers) g.__devSubscribers = new Set()

export const devNotifications = {
  add(notification: DevNotification) {
    g.__devNotifications!.push(notification)
    for (const subscriber of g.__devSubscribers!) {
      subscriber(notification)
    }
  },
  subscribe(fn: Subscriber): () => void {
    g.__devSubscribers!.add(fn)
    return () => g.__devSubscribers!.delete(fn)
  },
}
