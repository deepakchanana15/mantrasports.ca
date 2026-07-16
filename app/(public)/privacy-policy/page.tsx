import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { SITE_CONFIG, DEFAULT_SITE_SETTINGS } from '@/lib/config/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy Policy — Mantra Sports CA',
  description: 'How Mantra Sports Canada collects, uses and protects your personal information.',
}

export default async function PrivacyPolicyPage() {
  let businessName: string = DEFAULT_SITE_SETTINGS.legal_business_name
  let email: string = SITE_CONFIG.contact.email

  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: ['legal_business_name', 'contact_email'] } },
    })
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value ?? '']))
    if (map.legal_business_name) businessName = map.legal_business_name
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
          <span style={{ color: '#111111' }}>Privacy Policy</span>
        </nav>
      </div>

      <div style={{ padding: '64px 60px', maxWidth: 800, margin: '0 auto' }}>
        <h1 className="mb-2 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#111111' }}>
          Privacy Policy
        </h1>
        <p className="mb-8 text-[13px]" style={{ color: '#999999' }}>Last updated: {lastUpdated}</p>

        <div
          className="mb-10 rounded-[2px] px-5 py-4 text-[13px] leading-relaxed"
          style={{ background: '#FFF8EE', border: '1px solid #F0D9B5', color: '#7A5B1E' }}
        >
          <strong>Draft policy — pending legal review.</strong> This is a working draft, not legal advice. Have it
          reviewed by a lawyer before relying on it as your binding privacy policy, and update the business name
          in Admin → Settings → Legal once officially registered.
        </div>

        <div className="space-y-8 text-[15px] leading-[1.85]" style={{ color: '#333333' }}>
          <p>
            {businessName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates mantrasports.ca. This policy explains what
            personal information we collect, how we use it, and the choices you have, in line with Canada&apos;s
            Personal Information Protection and Electronic Documents Act (PIPEDA).
          </p>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Information We Collect
            </h2>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Contact details you provide via our contact, wholesale, or newsletter forms (name, email, phone, company)</li>
              <li>Order and billing information when you make a purchase</li>
              <li>Basic usage data (pages visited, browser type) via standard analytics tools</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              How We Use Your Information
            </h2>
            <p>We use your information to fulfill orders, respond to enquiries, provide wholesale quotes, send newsletter updates (only if you&apos;ve subscribed), and improve our website. We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Cookies
            </h2>
            <p>We use cookies for essential site functionality and, where you consent via our cookie banner, to understand site usage. You can manage cookie preferences at any time by clearing your browser&apos;s local storage for this site.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Third-Party Services
            </h2>
            <p>We use third-party providers to operate our store, including payment processing, email delivery, and image hosting. These providers only receive the information necessary to perform their function.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Your Rights
            </h2>
            <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us at <a href={`mailto:${email}`} className="underline hover:text-[#e85d1a]">{email}</a>.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Contact
            </h2>
            <p>Questions about this policy can be sent to <a href={`mailto:${email}`} className="underline hover:text-[#e85d1a]">{email}</a> or via our <Link href="/contact" className="underline hover:text-[#e85d1a]">Contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
