'use client'

import { useState } from 'react'
import { useSession, signOut } from '@/lib/auth-client'
import { Bug, X, LogOut, Database, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DevPanel() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2">
      {open && (
        <div className="w-64 overflow-hidden rounded-xl border border-amber-500/30 bg-background shadow-xl">
          <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-500/10 px-3 py-2">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Dev Panel
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-amber-600/70 hover:text-amber-600 dark:text-amber-400/70"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-3 p-3">
            <div>
              <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Session
              </p>
              {session ? (
                <div className="space-y-0.5">
                  <p className="truncate text-xs font-medium">{session.user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{session.user.email}</p>
                  <p className="truncate font-mono text-[10px] text-muted-foreground/70">
                    {session.user.id}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Not signed in</p>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Shortcuts
              </p>
              <div className="flex flex-col gap-1">
                <a
                  href="/api/dev/auto-login"
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-blue-500 hover:bg-accent"
                >
                  <Zap className="size-3" />
                  Sign in as demo user
                </a>
                <a
                  href="https://local.drizzle.studio/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-blue-500 hover:bg-accent"
                >
                  <Database className="size-3" />
                  Drizzle Studio
                </a>
                {session && (
                  <button
                    onClick={() =>
                      signOut({ fetchOptions: { onSuccess: () => { window.location.href = '/' } } })
                    }
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-destructive hover:bg-accent"
                  >
                    <LogOut className="size-3" />
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-md transition-colors',
          open
            ? 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400'
            : 'border-amber-500/30 bg-background text-amber-600/70 hover:bg-amber-500/10 dark:text-amber-400/70'
        )}
      >
        <Bug className="size-3.5" />
        Dev
      </button>
    </div>
  )
}
