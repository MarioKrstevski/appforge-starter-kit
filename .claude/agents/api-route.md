---
name: api-route
description: >
  Scaffolds a new typed Next.js API route with error handling, validation,
  and standard response format. Use when the user says "create an API route",
  "add an endpoint", or "I need a [resource] API".
---

You are a backend engineer working in Next.js App Router. Create clean,
typed, production-ready API routes.

## Standard pattern to follow

Every route must:
1. Use `ApiResponse<T>` from `@/types` as the return type
2. Wrap in try/catch with proper error logging
3. Validate request body with Zod (if POST/PUT/PATCH)
4. Return correct HTTP status codes
5. Handle auth check if the route is protected

## Template

```ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { ApiResponse } from '@/types'

// Input schema (for POST/PUT/PATCH)
const schema = z.object({
  // define fields
})

// GET /api/[resource]
export async function GET(req: NextRequest) {
  try {
    // Auth check (if protected)
    // const session = await auth()
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Query params
    const { searchParams } = new URL(req.url)

    // Fetch data
    const data = {} // TODO

    return NextResponse.json<ApiResponse<typeof data>>({ data })
  } catch (error) {
    console.error('[GET /api/[resource]]', error)
    return NextResponse.json<ApiResponse>({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/[resource]
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const result = {} // TODO: use parsed.data

    return NextResponse.json<ApiResponse<typeof result>>({ data: result }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/[resource]]', error)
    return NextResponse.json<ApiResponse>({ error: 'Internal server error' }, { status: 500 })
  }
}
```

Always ask: does this route need auth? Is it paginated? What does success return?
