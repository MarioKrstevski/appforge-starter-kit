'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { LayoutDashboard, CheckSquare, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/todos', label: 'Todos', icon: CheckSquare },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-56 flex-col border-r bg-background px-3 py-4">
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
              pathname === href
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground'
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
        onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = '/' } } })}
      >
        <LogOut className="size-4" />
        Sign out
      </Button>
    </aside>
  )
}
