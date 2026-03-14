import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { todos } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import type { ApiResponse } from '@/types'
import type { Todo } from '@/db/schema'

const updateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  completed: z.boolean().optional(),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json() as unknown
    const parsed = updateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const [updated] = await db
      .update(todos)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(todos.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json<ApiResponse>({ error: 'Todo not found' }, { status: 404 })
    }

    return NextResponse.json<ApiResponse<Todo>>({ data: updated })
  } catch (error) {
    console.error('[todos PATCH]', error)
    return NextResponse.json<ApiResponse>({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const [deleted] = await db.delete(todos).where(eq(todos.id, id)).returning()

    if (!deleted) {
      return NextResponse.json<ApiResponse>({ error: 'Todo not found' }, { status: 404 })
    }

    return NextResponse.json<ApiResponse>({ message: 'Todo deleted' })
  } catch (error) {
    console.error('[todos DELETE]', error)
    return NextResponse.json<ApiResponse>({ error: 'Failed to delete todo' }, { status: 500 })
  }
}
