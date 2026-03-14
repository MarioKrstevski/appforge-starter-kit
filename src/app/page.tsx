import { TodoList } from '@/components/todos/todo-list'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">AppForge Scaffold</h1>
        <p className="mt-1 text-muted-foreground">
          Todo example — testing Drizzle + Postgres + shadcn/ui
        </p>
      </div>
      <TodoList />
    </main>
  )
}
