import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'

// ─── GET /api/example ─────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page') ?? 1)
    const pageSize = Number(searchParams.get('pageSize') ?? 20)

    // TODO: Replace with real data fetching
    const data = { items: [], page, pageSize, total: 0 }

    return NextResponse.json<ApiResponse<typeof data>>({ data })
  } catch (error) {
    console.error('[GET /api/example]', error)
    return NextResponse.json<ApiResponse>({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── POST /api/example ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // TODO: Validate with Zod
    // const parsed = mySchema.safeParse(body)
    // if (!parsed.success) {
    //   return NextResponse.json({ error: parsed.error.message }, { status: 400 })
    // }

    // TODO: Replace with real logic
    const result = { id: 'new-id', ...body }

    return NextResponse.json<ApiResponse<typeof result>>({ data: result }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/example]', error)
    return NextResponse.json<ApiResponse>({ error: 'Internal server error' }, { status: 500 })
  }
}
