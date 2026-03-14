# Resend Email Setup

## 1. Install dependencies

```bash
npm install resend @react-email/components
```

## 2. Set environment variables

```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@yourdomain.com
```

## 3. Verify your domain in Resend dashboard

Go to resend.com → Domains and add your sending domain.

## 4. Use in your app

```ts
import { sendEmail } from '@/lib/email'
await sendEmail({ to: 'user@example.com', subject: 'Hello', react: <WelcomeEmail /> })
```
