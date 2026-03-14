export function DemoBanner() {
  return (
    <div className="relative z-40 border-b border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-center">
      <p className="text-xs text-amber-600 dark:text-amber-400">
        🚧 <strong>Demo Mode</strong> — local data only &middot; emails appear as toasts &middot; use{' '}
        <a href="/api/dev/auto-login" className="underline underline-offset-2">
          auto-login
        </a>{' '}
        to skip sign-in
      </p>
    </div>
  )
}
