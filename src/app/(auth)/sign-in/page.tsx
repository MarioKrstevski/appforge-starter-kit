import { SignInForm } from '@/components/auth/sign-in-form'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sign in' }

export default function SignInPage() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <SignInForm />
    </main>
  )
}
