import { NextRequest, NextResponse } from 'next/server'
import { paddle } from '@/lib/paddle'
import { EventName } from '@paddle/paddle-node-sdk'

export async function POST(req: NextRequest) {
  const signature = req.headers.get('paddle-signature')!
  const rawBody = await req.text()

  try {
    const event = await paddle.webhooks.unmarshal(
      rawBody,
      process.env.PADDLE_WEBHOOK_SECRET!,
      signature
    )

    switch (event.eventType) {
      case EventName.TransactionCompleted:
        // TODO: handle completed transaction
        console.log('[paddle] transaction completed', event.data.id)
        break
      case EventName.SubscriptionActivated:
      case EventName.SubscriptionCanceled:
        // TODO: sync subscription status to DB
        console.log('[paddle] subscription event', event.eventType)
        break
      default:
        console.log('[paddle] unhandled event', event.eventType)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[paddle webhook]', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
