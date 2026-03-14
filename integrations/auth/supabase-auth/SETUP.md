# Supabase Auth Setup

## 1. Install dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 2. Set environment variables

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## 3. Enable auth providers in Supabase dashboard

Go to Authentication → Providers in your Supabase project and enable the providers you want (Google, GitHub, etc).

## 4. Configure redirect URLs

In Supabase dashboard → Authentication → URL Configuration:
- Site URL: your production URL
- Redirect URLs: http://localhost:3000/auth/callback
