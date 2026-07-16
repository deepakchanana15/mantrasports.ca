import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { prisma } from '@/lib/db/prisma'
import { getSiteSettings } from '@/lib/utils/settings'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let contactEmail: string | undefined
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'contact_email' } })
    if (setting?.value) contactEmail = setting.value
  } catch {
    // fall through to default
  }

  const { free_shipping_threshold } = await getSiteSettings(['free_shipping_threshold'])

  return (
    <>
      {/* Skip to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar freeShippingThreshold={free_shipping_threshold} />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer contactEmail={contactEmail} />

      {/* Floating WhatsApp CTA — visible across all public pages */}
      <WhatsAppButton />

      {/* GDPR cookie consent banner */}
      <CookieBanner />
    </>
  )
}
