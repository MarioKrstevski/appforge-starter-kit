'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Zap, Send } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const magicSchema = z.object({
  email: z.string().email('Invalid email'),
})

type FormValues = z.infer<typeof schema>
type MagicFormValues = z.infer<typeof magicSchema>

interface SignInFormProps {
  isDemoMode?: boolean
}

export function SignInForm({ isDemoMode }: SignInFormProps) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [magicSent, setMagicSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const magicForm = useForm<MagicFormValues>({
    resolver: zodResolver(magicSchema),
  })

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    const { error } = await signIn.email({ email: values.email, password: values.password })
    if (error) {
      setServerError(error.message ?? 'Invalid email or password')
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  const onMagicLink = async (values: MagicFormValues) => {
    const { error } = await signIn.magicLink({ email: values.email })
    if (error) {
      magicForm.setError('email', { message: error.message ?? 'Could not send magic link' })
      return
    }
    setMagicSent(true)
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {isDemoMode && (
        <a
          href="/api/dev/auto-login"
          className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-500/20 dark:text-amber-400"
        >
          <Zap className="size-4" />
          Sign in as demo user
        </a>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your email and password to continue</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            {serverError && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {serverError}
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="text-foreground underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Magic Link</CardTitle>
          <CardDescription className="text-sm">
            {isDemoMode
              ? 'A toast will appear with your sign-in link'
              : 'Get a sign-in link sent to your email'}
          </CardDescription>
        </CardHeader>
        {magicSent ? (
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {isDemoMode ? '✓ Check the toast notification' : '✓ Check your email for the link'}
            </p>
          </CardContent>
        ) : (
          <form onSubmit={magicForm.handleSubmit(onMagicLink)}>
            <CardContent className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...magicForm.register('email')}
                />
                {magicForm.formState.errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {magicForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="outline"
                size="icon"
                disabled={magicForm.formState.isSubmitting}
              >
                <Send className="size-4" />
              </Button>
            </CardContent>
          </form>
        )}
      </Card>
    </div>
  )
}
