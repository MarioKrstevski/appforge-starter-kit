import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/db'
import { todos } from '@/db/schema'
import { eq, count } from 'drizzle-orm'
import { CheckCircle2, Circle, ListTodo, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  const [totalResult] = await db.select({ count: count() }).from(todos)
  const [completedResult] = await db
    .select({ count: count() })
    .from(todos)
    .where(eq(todos.completed, true))

  const total = totalResult?.count ?? 0
  const completed = completedResult?.count ?? 0
  const pending = total - completed
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0

  const stats = [
    {
      title: 'Total Todos',
      value: total,
      icon: ListTodo,
      description: 'All time',
    },
    {
      title: 'Completed',
      value: completed,
      icon: CheckCircle2,
      description: 'Done',
    },
    {
      title: 'Pending',
      value: pending,
      icon: Circle,
      description: 'Still to do',
    },
    {
      title: 'Completion Rate',
      value: `${rate}%`,
      icon: TrendingUp,
      description: total > 0 ? `${completed} of ${total} done` : 'No todos yet',
    },
  ]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, {session?.user.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="text-muted-foreground">Here&apos;s an overview of your activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ title, value, icon: Icon, description }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your todo stats update in real time as you add and complete items on the{' '}
              <a href="/" className="text-foreground underline-offset-4 hover:underline">
                home page
              </a>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <p className="text-sm">
              <span className="text-muted-foreground">Name: </span>
              {session?.user.name}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Email: </span>
              {session?.user.email}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Member since: </span>
              {session?.user.createdAt
                ? new Date(session.user.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : '—'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
