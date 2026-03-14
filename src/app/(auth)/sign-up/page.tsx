import { SignUpForm } from '@/components/auth/sign-up-form'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sign up' }

export default function SignUpPage() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <SignUpForm />
    </main>
  )
}
