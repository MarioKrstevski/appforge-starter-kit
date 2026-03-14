import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { todos } from '@/db/schema'
import { asc } from 'drizzle-orm'
import { z } from 'zod'
import type { ApiResponse } from '@/types'
import type { Todo } from '@/db/schema'

const createSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
})

export async function GET() {
  try {
    const results = await db.select().from(todos).orderBy(asc(todos.createdAt))
    return NextResponse.json<ApiResponse<Todo[]>>({ data: results })
  } catch (error) {
    console.error('[todos GET]', error)
    return NextResponse.json<ApiResponse>({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const parsed = createSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const [todo] = await db.insert(todos).values({ title: parsed.data.title }).returning()
    return NextResponse.json<ApiResponse<Todo>>({ data: todo }, { status: 201 })
  } catch (error) {
    console.error('[todos POST]', error)
    return NextResponse.json<ApiResponse>({ error: 'Failed to create todo' }, { status: 500 })
  }
}
