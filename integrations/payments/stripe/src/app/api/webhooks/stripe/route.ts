import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { Stripe } from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('[stripe webhook] signature verification failed', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.CheckoutSession
        // TODO: handle successful checkout
        console.log('[stripe] checkout completed', session.id)
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        // TODO: sync subscription status to DB
        console.log('[stripe] subscription updated', subscription.id)
        break
      }
      default:
        console.log('[stripe] unhandled event type', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[stripe webhook]', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
