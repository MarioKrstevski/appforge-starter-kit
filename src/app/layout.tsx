import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/layout/navbar'
import { Toaster } from '@/components/ui/sonner'
import { isDemoMode } from '@/config/dev'
import { DemoBanner } from '@/components/dev/demo-banner'
import { DevToasts } from '@/components/dev/dev-toasts'
import { DevPanel } from '@/components/dev/dev-panel'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Navbar />
        {isDemoMode && <DemoBanner />}
        {children}
        <Toaster richColors closeButton />
        {isDemoMode && <DevToasts />}
        {isDemoMode && <DevPanel />}
      </body>
    </html>
  )
}
