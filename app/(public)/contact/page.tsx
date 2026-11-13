import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, ChevronRight, MessageCircle } from 'lucide-react'
import { ContactForm } from './ContactForm'
import { prisma } from '@/lib/db/prisma'
import { SITE_CONFIG } from '@/lib/config/site'
import { getSiteSettings } from '@/lib/utils/settings'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact — Mantra Sports CA',
  description:
    'Get in touch with Mantra Sports Canada. Product questions, wholesale, support — we are happy to help.',
}

export default async function ContactPage() {
  // Load live contact details from settings if set
  let email: string = SITE_CONFIG.contact.email
  let phone: string = SITE_CONFIG.contact.phone
  let address: string = SITE_CONFIG.contact.address
  let whatsapp: string = SITE_CONFIG.contact.whatsapp

  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: ['contact_email', 'contact_phone', 'contact_address', 'whatsapp_number'] } },
    })
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value ?? '']))
    if (map.contact_email) email = map.contact_email
    if (map.contact_phone) phone = map.contact_phone
    if (map.contact_address) address = map.contact_address
    if (map.whatsapp_number) whatsapp = map.whatsapp_number
  } catch {
    // fall through to defaults
  }

  const hasPhone = phone && phone !== 'TO_BE_PROVIDED'
  const hasAddress = address && address !== 'TO_BE_PROVIDED'
  const hasWhatsApp = whatsapp && whatsapp !== 'TO_BE_PROVIDED'

  const { response_time_hours } = await getSiteSettings(['response_time_hours'])

  return (
    <div className="bg-white">

      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>Contact</span>
        </nav>
      </div>

      {/* Hero */}
      <div style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ padding: '64px 60px' }}>
          <p
            className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: '#e85d1a' }}
          >
            We&apos;re Here For You
          </p>
          <h1
            className="mb-4 font-display font-bold uppercase leading-tight tracking-[0.01em]"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: '#ffffff' }}
          >
            Contact
          </h1>
          <p className="max-w-[500px] text-[16px] font-light leading-[1.8]" style={{ color: '#A0A0A0' }}>
            Have questions about products, orders or wholesale terms? Our team is happy to help.
          </p>
        </div>
      </div>

      {/* Main */}
      <div style={{ padding: '64px 60px' }}>
        <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1.3fr', alignItems: 'start' }}>

          {/* Left — contact info */}
          <div className="space-y-6">
            <div>
              <p
                className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: '#e85d1a' }}
              >
                Contact Details
              </p>
              <h2
                className="mb-6 font-display text-[28px] font-bold uppercase leading-tight tracking-[0.02em]"
                style={{ color: '#111111' }}
              >
                Get In Touch
              </h2>
            </div>

            <div style={{ border: '1px solid #E0DFDB' }}>
              {/* Email — always shown */}
              <div className="flex gap-4" style={{ padding: '24px', borderBottom: '1px solid #E0DFDB' }}>
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px]"
                  style={{ background: '#FFF5ED' }}
                >
                  <Mail className="h-4 w-4" style={{ color: '#e85d1a' }} />
                </div>
                <div>
                  <p
                    className="mb-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: '#6B6B6B' }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="font-display text-[15px] font-semibold transition-colors hover:text-[#e85d1a]"
                    style={{ color: '#111111' }}
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              {hasWhatsApp && (
                <div className="flex gap-4" style={{ padding: '24px', borderBottom: '1px solid #E0DFDB' }}>
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px]"
                    style={{ background: '#FFF5ED' }}
                  >
                    <MessageCircle className="h-4 w-4" style={{ color: '#e85d1a' }} />
                  </div>
                  <div>
                    <p
                      className="mb-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: '#6B6B6B' }}
                    >
                      WhatsApp
                    </p>
                    <a
                      href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-[15px] font-semibold transition-colors hover:text-[#e85d1a]"
                      style={{ color: '#111111' }}
                    >
                      {whatsapp}
                    </a>
                  </div>
                </div>
              )}

              {/* Phone */}
              {hasPhone && (
                <div className="flex gap-4" style={{ padding: '24px', borderBottom: hasAddress ? '1px solid #E0DFDB' : 'none' }}>
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px]"
                    style={{ background: '#FFF5ED' }}
                  >
                    <Phone className="h-4 w-4" style={{ color: '#e85d1a' }} />
                  </div>
                  <div>
                    <p
                      className="mb-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: '#6B6B6B' }}
                    >
                      Phone
                    </p>
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="font-display text-[15px] font-semibold transition-colors hover:text-[#e85d1a]"
                      style={{ color: '#111111' }}
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Address */}
              {hasAddress && (
                <div className="flex gap-4" style={{ padding: '24px' }}>
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px]"
                    style={{ background: '#FFF5ED' }}
                  >
                    <MapPin className="h-4 w-4" style={{ color: '#e85d1a' }} />
                  </div>
                  <div>
                    <p
                      className="mb-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: '#6B6B6B' }}
                    >
                      Address
                    </p>
                    <p className="text-[15px] leading-relaxed" style={{ color: '#111111' }}>{address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Response time */}
            <div
              className="flex gap-4"
              style={{ border: '1px solid #E0DFDB', padding: '20px 24px', background: '#F8F7F4' }}
            >
              <Clock className="mt-0.5 h-5 w-5 shrink-0" style={{ color: '#e85d1a' }} />
              <div>
                <p
                  className="mb-0.5 font-display text-[12px] font-semibold uppercase tracking-[0.1em]"
                  style={{ color: '#111111' }}
                >
                  Response Time
                </p>
                <p className="text-[13px]" style={{ color: '#6B6B6B' }}>
                  We typically respond within <strong>{response_time_hours} hours</strong> on business days.
                </p>
              </div>
            </div>

            {/* Wholesale CTA */}
            <div style={{ border: '1px solid #e85d1a', padding: '20px 24px', background: '#FFF5ED' }}>
              <p
                className="mb-1 font-display text-[12px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: '#e85d1a' }}
              >
                Wholesale & B2B
              </p>
              <p className="mb-3 text-[13px]" style={{ color: '#333333' }}>
                Are you a club, dealer or academy? Use our dedicated wholesale enquiry form.
              </p>
              <Link
                href="/wholesale"
                className="inline-flex items-center gap-1.5 font-display text-[12px] font-bold uppercase tracking-wider"
                style={{ color: '#e85d1a' }}
              >
                Go to wholesale form <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <ContactForm responseTimeHours={response_time_hours} />
          </div>
        </div>
      </div>

    </div>
  )
}
