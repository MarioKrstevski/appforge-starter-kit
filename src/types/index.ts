// ─── API Response shapes ──────────────────────────────────────────────────────
export type ApiResponse<T = unknown> = {
  data?: T
  error?: string
  message?: string
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ─── UI State ─────────────────────────────────────────────────────────────────
export type ActionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; message?: string }
  | { status: 'error'; message: string }

// ─── Common entity shapes ─────────────────────────────────────────────────────
export type WithId = { id: string }
export type WithTimestamps = { createdAt: Date; updatedAt: Date }
export type BaseEntity = WithId & WithTimestamps

// ─── Navigation ───────────────────────────────────────────────────────────────
export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
  label?: string
  description?: string
}

export type NavSection = {
  title: string
  items: NavItem[]
}

// ─── User ─────────────────────────────────────────────────────────────────────
export type UserRole = 'user' | 'admin' | 'superadmin'

export type User = BaseEntity & {
  email: string
  name: string | null
  image: string | null
  role: UserRole
}

// ─── Misc ─────────────────────────────────────────────────────────────────────
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Nullable<T> = T | null
export type Maybe<T> = T | null | undefined
