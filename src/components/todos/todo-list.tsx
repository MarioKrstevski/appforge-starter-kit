'use client'

import { useEffect, useState } from 'react'
import { TodoItem } from './todo-item'
import { CreateTodoForm } from './create-todo-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Todo } from '@/db/schema'

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/todos')
      .then((r) => r.json() as Promise<{ data?: Todo[] }>)
      .then((json) => {
        if (json.data) setTodos(json.data)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleCreated = (todo: Todo) => {
    setTodos((prev) => [...prev, todo])
  }

  const handleToggle = async (id: string, completed: boolean) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed } : t)))
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
  }

  const handleDelete = async (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
  }

  const remaining = todos.filter((t) => !t.completed).length

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>My Todos</span>
          {todos.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              {remaining} of {todos.length} remaining
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CreateTodoForm onCreated={handleCreated} />

        {loading && (
          <p className="py-4 text-center text-sm text-muted-foreground">Loading...</p>
        )}

        {!loading && todos.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No todos yet. Add one above!
          </p>
        )}

        {!loading && todos.length > 0 && (
          <div className="flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
