import { NextRequest, NextResponse } from 'next/server'
import { isDemoMode } from '@/config/dev'
import { auth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!isDemoMode) {
    return NextResponse.json({ error: 'Not available' }, { status: 404 })
  }

  try {
    const signInResponse = await auth.api.signInEmail({
      body: { email: 'demo@appforge.com', password: 'demo1234' },
      asResponse: true,
    })

    if (!signInResponse.ok) {
      return NextResponse.json({ error: 'Demo user not found — run pnpm db:seed' }, { status: 500 })
    }

    const redirect = NextResponse.redirect(new URL('/dashboard', req.url))
    const setCookie = signInResponse.headers.get('set-cookie')
    if (setCookie) redirect.headers.set('set-cookie', setCookie)
    return redirect
  } catch {
    return NextResponse.json({ error: 'Demo user not found — run pnpm db:seed' }, { status: 500 })
  }
}
