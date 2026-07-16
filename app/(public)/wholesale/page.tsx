import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Package, Truck, Headphones, ChevronRight } from 'lucide-react'
import { WholesaleForm } from './WholesaleForm'
import { getSiteSettings } from '@/lib/utils/settings'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Wholesale & B2B — Mantra Sports CA',
  description:
    'Wholesale enquiries for clubs, schools and retailers. Premium cricket equipment at competitive B2B pricing — shipped Canada-wide.',
}

const BENEFITS = [
  {
    icon: Award,
    title: 'Premium Quality',
    text: 'The same professional-grade products used by international players — now for your team or store.',
  },
  {
    icon: Package,
    title: 'Flexible Quantities',
    text: 'Whether it is 10 or 500 units, we offer scalable wholesale pricing for every order.',
  },
  {
    icon: Truck,
    title: 'Canada-Wide Shipping',
    text: 'Fast and reliable delivery across Canada, straight to your address or warehouse.',
  },
  {
    icon: Headphones,
    title: 'Personal Service',
    text: 'Our B2B team is ready for individual enquiries, custom orders and volume discounts.',
  },
]

const WHO_FOR = [
  'Cricket Clubs & Sports Associations',
  'Schools & Universities',
  'Sports Stores & Retailers',
  'Resellers & Distributors',
  'Cricket Academies',
  'National & Provincial Federations',
]

export default async function WholesalePage() {
  const { response_time_hours } = await getSiteSettings(['response_time_hours'])

  return (
    <div className="bg-white">

      {/* ── Breadcrumb ── */}
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>Wholesale</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <div style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ padding: '72px 60px' }}>
          <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>
            For Clubs & Dealers
          </p>
          <h1 className="mb-4 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#ffffff' }}>
            Wholesale & B2B Enquiries
          </h1>
          <p className="max-w-[560px] text-[16px] font-light leading-[1.8]" style={{ color: '#A0A0A0' }}>
            Mantra Sports CA supplies premium cricket equipment to clubs, schools, dealers and academies across Canada — at fair wholesale pricing and with personal service.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ padding: '64px 60px' }}>
        <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'start' }}>

          {/* Left — info */}
          <div>
            <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Why Mantra Sports</p>
            <h2 className="mb-8 font-display text-[32px] font-bold uppercase leading-tight tracking-[0.02em]" style={{ color: '#111111' }}>
              Your Trusted Cricket Partner
            </h2>

            <div className="mb-10 space-y-0" style={{ border: '1px solid #E0DFDB' }}>
              {BENEFITS.map((item, i) => (
                <div key={item.title} className="flex gap-4" style={{ padding: '24px', borderBottom: i < BENEFITS.length - 1 ? '1px solid #E0DFDB' : 'none' }}>
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px]" style={{ background: '#FFF5ED' }}>
                    <item.icon className="h-4 w-4" style={{ color: '#e85d1a' }} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-display text-[15px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>{item.title}</h3>
                    <p className="text-[14px] leading-relaxed" style={{ color: '#6B6B6B' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ border: '1px solid #E0DFDB', padding: '24px', background: '#F8F7F4' }}>
              <p className="mb-4 font-display text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: '#6B6B6B' }}>Suitable For</p>
              <ul className="space-y-2">
                {WHO_FOR.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[14px]" style={{ color: '#333333' }}>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#e85d1a' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <WholesaleForm responseTimeHours={response_time_hours} />
          </div>
        </div>
      </div>

    </div>
  )
}
