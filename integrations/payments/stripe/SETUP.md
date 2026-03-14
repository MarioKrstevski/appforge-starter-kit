# Stripe Setup

## 1. Install dependencies

```bash
npm install stripe @stripe/stripe-js
```

## 2. Set environment variables

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 3. Set up webhook

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook secret printed to your terminal into `STRIPE_WEBHOOK_SECRET`.
