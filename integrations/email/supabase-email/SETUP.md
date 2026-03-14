# Supabase Email (SMTP) Setup

Supabase provides a built-in SMTP server for transactional email (dev use only).
For production, configure a custom SMTP provider in the Supabase dashboard.

## 1. Configure SMTP in Supabase dashboard

Go to Project Settings → Authentication → SMTP Settings and enable custom SMTP.

## 2. Set environment variables

```
SUPABASE_SMTP_HOST=smtp.yourdomain.com
SUPABASE_SMTP_PORT=587
SUPABASE_SMTP_USER=
SUPABASE_SMTP_PASS=
SUPABASE_FROM_EMAIL=hello@yourdomain.com
```
