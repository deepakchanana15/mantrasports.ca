import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { SITE_CONFIG } from '@/lib/config/site'
import '@/styles/globals.css'

// ── Fonts — downloaded at build time, served from same origin ──────────────
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-oswald',
})

// ── Default Metadata ───────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.seo.defaultTitle,
    template: SITE_CONFIG.seo.titleTemplate,
  },
  description: SITE_CONFIG.seo.defaultDescription,
  alternates: { canonical: '/' },
  keywords: [
    'wholesale cricket equipment Canada',
    'cricket bats Canada',
    'cricket club equipment supplier',
    'B2B cricket gear',
    'cricket academy equipment',
    'English willow cricket bats',
    'cricket performance sportswear',
    'Mantra Sports',
  ],
  authors: [{ name: 'Mantra Sports' }],
  creator: 'Mantra Sports',
  publisher: 'Mantra Sports',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.seo.defaultTitle,
    description: SITE_CONFIG.seo.defaultDescription,
    images: [{ url: SITE_CONFIG.seo.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONFIG.seo.twitterHandle,
    title: SITE_CONFIG.seo.defaultTitle,
    description: SITE_CONFIG.seo.defaultDescription,
    images: [SITE_CONFIG.seo.defaultOgImage],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
}

// ── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      suppressHydrationWarning
    >
      <head>
        {/*
          Only apply dark class if user explicitly chose dark.
          Default is always light — no flash of dark theme.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mantra-theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${oswald.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${SITE_CONFIG.url}/#organization`,
                  name: 'Mantra Sports',
                  url: SITE_CONFIG.url,
                  logo: `${SITE_CONFIG.url}/images/og-default.jpg`,
                  description:
                    'Mantra Sports supplies premium cricket bats, protective gear, balls, performance sportswear and accessories. This site handles wholesale and B2B enquiries from clubs, academies, schools and retailers in Canada.',
                  areaServed: { '@type': 'Country', name: 'Canada' },
                  sameAs: ['https://mantrasports.com.au', 'https://www.mantrasportsusa.com'],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'sales',
                    email: SITE_CONFIG.contact.email,
                    telephone: '+1-385-601-3759',
                    areaServed: 'CA',
                    availableLanguage: ['English'],
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_CONFIG.url}/#website`,
                  url: SITE_CONFIG.url,
                  name: 'Mantra Sports Canada',
                  inLanguage: 'en-CA',
                  publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
                },
              ],
            }),
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
