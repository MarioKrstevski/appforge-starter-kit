import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

// ─── Shared types ─────────────────────────────────────────────────────────────
export type Review = {
  id: string
  author: string
  role: string
  company?: string
  avatar?: string
  rating: number
  content: string
  date?: string
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    role: 'Product Designer',
    company: 'Stripe',
    rating: 5,
    content:
      'This completely changed how our team works. We shipped twice as fast and the quality actually improved. I recommend it to every designer I meet.',
  },
  {
    id: '2',
    author: 'Marcus Williams',
    role: 'CTO',
    company: 'Linear',
    rating: 5,
    content:
      "The best tool investment we made this year. Setup took 20 minutes and we saw results the same day. Our whole engineering org is now using it.",
  },
  {
    id: '3',
    author: 'Priya Patel',
    role: 'Founder',
    company: 'Vercel',
    rating: 5,
    content:
      "I was skeptical at first but the results speak for themselves. It's rare to find a product that delivers exactly what it promises.",
  },
  {
    id: '4',
    author: 'Tom Eriksson',
    role: 'Engineering Manager',
    company: 'Notion',
    rating: 5,
    content:
      'Replaced three tools with this one. The team loves it, our PM loves it, and I love the reduced complexity. Game changer.',
  },
  {
    id: '5',
    author: 'Aisha Johnson',
    role: 'Head of Design',
    company: 'Figma',
    rating: 5,
    content:
      "Finally, something that actually works as advertised. The support team is incredible too — they respond in minutes, not days.",
  },
  {
    id: '6',
    author: 'Diego Ramirez',
    role: 'Senior Engineer',
    company: 'Shopify',
    rating: 5,
    content:
      "I've tried every alternative. Nothing comes close. The DX is exceptional and the output quality consistently impresses stakeholders.",
  },
]

function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn('flex gap-0.5', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'
          )}
        />
      ))}
    </div>
  )
}

function Avatar({ name, src, size = 'md' }: { name: string; src?: string; size?: 'sm' | 'md' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm' }
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover', sizes[size])}
      />
    )
  }
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium',
        sizes[size]
      )}
    >
      {initials}
    </div>
  )
}

// ─── V1: Simple card grid ─────────────────────────────────────────────────────
export type ReviewsV1Props = {
  reviews?: Review[]
  title?: string
  subtitle?: string
  className?: string
}

export function ReviewsV1({
  reviews = SAMPLE_REVIEWS.slice(0, 3),
  title = 'Loved by teams everywhere',
  subtitle = 'Join thousands of teams already using our product.',
  className,
}: ReviewsV1Props) {
  return (
    <section className={cn('py-24', className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm"
            >
              <StarRating rating={review.rating} />
              <p className="flex-1 text-sm leading-relaxed text-foreground">{review.content}</p>
              <div className="flex items-center gap-3">
                <Avatar name={review.author} src={review.avatar} />
                <div>
                  <p className="text-sm font-medium">{review.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.role}
                    {review.company ? ` · ${review.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── V2: Featured quote + grid ────────────────────────────────────────────────
export type ReviewsV2Props = {
  reviews?: Review[]
  featured?: Review
  title?: string
  className?: string
}

export function ReviewsV2({
  reviews = SAMPLE_REVIEWS.slice(1, 5),
  featured = SAMPLE_REVIEWS[0],
  title = 'What our customers say',
  className,
}: ReviewsV2Props) {
  return (
    <section className={cn('py-24 bg-muted/30', className)}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured large review */}
          <div className="flex flex-col justify-between rounded-2xl bg-primary p-8 text-primary-foreground lg:row-span-2">
            <div>
              <StarRating rating={featured.rating} className="[&>svg]:fill-white [&>svg]:text-white" />
              <blockquote className="mt-6 text-xl font-medium leading-relaxed">
                "{featured.content}"
              </blockquote>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <Avatar name={featured.author} src={featured.avatar} />
              <div>
                <p className="font-semibold">{featured.author}</p>
                <p className="text-sm opacity-75">
                  {featured.role}
                  {featured.company ? ` · ${featured.company}` : ''}
                </p>
              </div>
            </div>
          </div>
          {/* Smaller review cards */}
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border bg-card p-6">
              <StarRating rating={review.rating} />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.content}</p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar name={review.author} src={review.avatar} size="sm" />
                <div>
                  <p className="text-sm font-medium">{review.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.role}
                    {review.company ? ` · ${review.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── V3: Scrolling marquee style ──────────────────────────────────────────────
export type ReviewsV3Props = {
  reviews?: Review[]
  title?: string
  subtitle?: string
  className?: string
}

export function ReviewsV3({
  reviews = SAMPLE_REVIEWS,
  title = 'Trusted by the best teams',
  subtitle = 'Real reviews from real customers.',
  className,
}: ReviewsV3Props) {
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2))
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2))

  return (
    <section className={cn('py-24 overflow-hidden', className)}>
      <div className="mx-auto max-w-6xl px-4 text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Row 1 */}
      <div className="flex gap-6 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {[...firstRow, ...firstRow].map((review, i) => (
          <div
            key={`${review.id}-${i}`}
            className="flex-none w-80 rounded-xl border bg-card p-5 shadow-sm"
          >
            <StarRating rating={review.rating} />
            <p className="mt-3 text-sm leading-relaxed line-clamp-3">{review.content}</p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar name={review.author} src={review.avatar} size="sm" />
              <div>
                <p className="text-sm font-medium">{review.author}</p>
                <p className="text-xs text-muted-foreground">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide pl-16">
        {[...secondRow, ...secondRow].map((review, i) => (
          <div
            key={`${review.id}-${i}`}
            className="flex-none w-80 rounded-xl border bg-card p-5 shadow-sm"
          >
            <StarRating rating={review.rating} />
            <p className="mt-3 text-sm leading-relaxed line-clamp-3">{review.content}</p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar name={review.author} src={review.avatar} size="sm" />
              <div>
                <p className="text-sm font-medium">{review.author}</p>
                <p className="text-xs text-muted-foreground">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
