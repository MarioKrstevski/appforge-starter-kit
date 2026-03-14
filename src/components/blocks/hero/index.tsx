import { cn } from '@/lib/utils'

// ─── V1: Centered, minimal ────────────────────────────────────────────────────
export type HeroV1Props = {
  badge?: string
  headline: string
  subheadline?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

export function HeroV1({
  badge = 'Now in beta',
  headline = 'Build products your\nusers will love',
  subheadline = 'The fastest way to go from idea to shipped. Used by 10,000+ teams.',
  primaryCta = { label: 'Get started free', href: '/signup' },
  secondaryCta = { label: 'See how it works', href: '#demo' },
  className,
}: HeroV1Props) {
  return (
    <section className={cn('py-32 text-center', className)}>
      <div className="mx-auto max-w-3xl px-4">
        {badge && (
          <span className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            {badge}
          </span>
        )}
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl whitespace-pre-line">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">{subheadline}</p>
        )}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          {primaryCta && (
            <a
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:opacity-90 transition-opacity"
            >
              {primaryCta.label}
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── V2: Split layout with visual ─────────────────────────────────────────────
export type HeroV2Props = {
  eyebrow?: string
  headline: string
  subheadline?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  stats?: { value: string; label: string }[]
  className?: string
}

export function HeroV2({
  eyebrow = 'Introducing v2.0',
  headline = 'The platform built for modern teams',
  subheadline = 'Stop juggling tools. Bring your team together in one place that actually works.',
  primaryCta = { label: 'Start for free', href: '/signup' },
  secondaryCta = { label: 'Book a demo', href: '/demo' },
  stats = [
    { value: '10K+', label: 'Teams' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9★', label: 'Rating' },
  ],
  className,
}: HeroV2Props) {
  return (
    <section className={cn('py-24', className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <div>
            {eyebrow && (
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
                {eyebrow}
              </p>
            )}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
            {subheadline && (
              <p className="mt-5 text-lg text-muted-foreground">{subheadline}</p>
            )}
            <div className="mt-8 flex gap-4 flex-wrap">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
            {stats && (
              <div className="mt-12 flex gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Right: visual placeholder */}
          <div className="relative aspect-video rounded-2xl bg-muted border overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
              Product screenshot / demo
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── V3: Dark, bold, full-width ───────────────────────────────────────────────
export type HeroV3Props = {
  headline: string
  subheadline?: string
  primaryCta?: { label: string; href: string }
  className?: string
}

export function HeroV3({
  headline = 'Ship faster.\nBreak less.',
  subheadline = 'The developer platform that gets out of your way.',
  primaryCta = { label: 'Get early access', href: '/signup' },
  className,
}: HeroV3Props) {
  return (
    <section
      className={cn(
        'relative flex min-h-[80vh] items-center bg-foreground text-background py-32',
        className
      )}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4">
        <h1 className="text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl whitespace-pre-line leading-none">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-8 text-xl text-background/60 max-w-lg">{subheadline}</p>
        )}
        {primaryCta && (
          <div className="mt-10">
            <a
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-lg bg-background text-foreground px-8 py-4 text-base font-semibold hover:bg-background/90 transition-colors"
            >
              {primaryCta.label} →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
