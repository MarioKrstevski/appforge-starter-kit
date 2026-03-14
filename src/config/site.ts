export const siteConfig = {
  name: 'My App',
  description: '',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  ogImage: '/og.png',
  links: {
    twitter: '',
    github: '',
  },
}

export type SiteConfig = typeof siteConfig
