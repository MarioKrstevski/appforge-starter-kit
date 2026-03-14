'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Todo } from '@/db/schema'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
      <Checkbox
        id={todo.id}
        checked={todo.completed}
        onCheckedChange={(checked) => onToggle(todo.id, checked === true)}
      />
      <label
        htmlFor={todo.id}
        className={cn(
          'flex-1 cursor-pointer text-sm',
          todo.completed && 'text-muted-foreground line-through'
        )}
      >
        {todo.title}
      </label>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-muted-foreground hover:text-destructive"
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}
