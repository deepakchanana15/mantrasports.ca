import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { SITE_CONFIG, DEFAULT_SITE_SETTINGS } from '@/lib/config/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Mantra Sports CA',
  description: 'The terms and conditions governing purchases and use of the Mantra Sports Canada website.',
}

export default async function TermsPage() {
  let businessName: string = DEFAULT_SITE_SETTINGS.legal_business_name
  let region: string = DEFAULT_SITE_SETTINGS.legal_governing_region
  let email: string = SITE_CONFIG.contact.email

  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: ['legal_business_name', 'legal_governing_region', 'contact_email'] } },
    })
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value ?? '']))
    if (map.legal_business_name) businessName = map.legal_business_name
    if (map.legal_governing_region) region = map.legal_governing_region
    if (map.contact_email) email = map.contact_email
  } catch {
    // fall through to defaults
  }

  const lastUpdated = 'July 2026'

  return (
    <div className="bg-white">
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>Terms & Conditions</span>
        </nav>
      </div>

      <div style={{ padding: '64px 60px', maxWidth: 800, margin: '0 auto' }}>
        <h1 className="mb-2 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#111111' }}>
          Terms &amp; Conditions
        </h1>
        <p className="mb-8 text-[13px]" style={{ color: '#999999' }}>Last updated: {lastUpdated}</p>

        <div
          className="mb-10 rounded-[2px] px-5 py-4 text-[13px] leading-relaxed"
          style={{ background: '#FFF8EE', border: '1px solid #F0D9B5', color: '#7A5B1E' }}
        >
          <strong>Draft policy — pending legal review.</strong> This is a working draft, not legal advice. Have it
          reviewed by a lawyer before relying on it as binding terms, and update the business name and governing
          region in Admin → Settings → Legal once officially registered.
        </div>

        <div className="space-y-8 text-[15px] leading-[1.85]" style={{ color: '#333333' }}>
          <p>
            These Terms &amp; Conditions govern your use of mantrasports.ca and any purchase made through it,
            operated by {businessName}. By using this site or placing an order, you agree to these terms.
          </p>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Orders &amp; Pricing
            </h2>
            <p>All prices are listed in Canadian dollars (CAD) and are subject to change without notice. We reserve the right to refuse or cancel any order, including in cases of pricing errors or suspected fraud.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Product Information
            </h2>
            <p>We aim to display product details, images and stock availability as accurately as possible. Minor variations in bat weight, grain and finish are natural in willow products and do not constitute a defect.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Shipping &amp; Returns
            </h2>
            <p>Shipping timelines and costs are outlined in our <Link href="/shipping-policy" className="underline hover:text-[#e85d1a]">Shipping Policy</Link>. Returns and exchanges are governed by our <Link href="/returns-policy" className="underline hover:text-[#e85d1a]">Returns Policy</Link>.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Wholesale &amp; B2B Orders
            </h2>
            <p>Wholesale pricing, minimum order quantities and payment terms are agreed individually and may be subject to a separate wholesale agreement.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Limitation of Liability
            </h2>
            <p>To the fullest extent permitted by law, {businessName} is not liable for indirect, incidental or consequential damages arising from the use of our products or website.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Governing Law
            </h2>
            <p>These terms are governed by the laws of {region}, without regard to conflict of law principles.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Contact
            </h2>
            <p>Questions about these terms can be sent to <a href={`mailto:${email}`} className="underline hover:text-[#e85d1a]">{email}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
