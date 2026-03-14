# Paddle Setup

## 1. Install dependencies

```bash
npm install @paddle/paddle-js @paddle/paddle-node-sdk
```

## 2. Set environment variables

```
PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
```

## 3. Set up webhook in Paddle dashboard

Go to Developer Tools → Notifications and add your webhook URL:
`https://yourdomain.com/api/webhooks/paddle`
