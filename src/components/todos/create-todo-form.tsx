'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Todo } from '@/db/schema'

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
})

type FormValues = z.infer<typeof schema>

interface CreateTodoFormProps {
  onCreated: (todo: Todo) => void
}

export function CreateTodoForm({ onCreated }: CreateTodoFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: FormValues) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const json = await res.json() as { data?: Todo; error?: string }
    if (json.data) {
      onCreated(json.data)
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1">
        <Input
          {...register('title')}
          placeholder="Add a new todo..."
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add'}
      </Button>
    </form>
  )
}
