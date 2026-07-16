import type { Metadata } from 'next'
import Link from 'next/link'
import { Handshake, TrendingUp, Package, ChevronRight } from 'lucide-react'
import { WholesaleForm } from '../wholesale/WholesaleForm'

export const metadata: Metadata = {
  title: 'B2B Partnerships — Mantra Sports CA',
  description: 'Partner with Mantra Sports Canada for ongoing B2B supply — retailers, distributors and multi-location dealers.',
}

const BENEFITS = [
  {
    icon: Handshake,
    title: 'Dedicated Account Support',
    text: 'A single point of contact for pricing, stock levels and reorders — not a different rep every time.',
  },
  {
    icon: TrendingUp,
    title: 'Volume-Based Pricing',
    text: 'Pricing that scales with your order volume, reviewed as your business grows with us.',
  },
  {
    icon: Package,
    title: 'Reliable Reordering',
    text: 'Consistent stock availability and predictable lead times for repeat and standing orders.',
  },
]

export default function B2BPage() {
  return (
    <div className="bg-white">
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>B2B Partnerships</span>
        </nav>
      </div>

      <div style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ padding: '72px 60px' }}>
          <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>
            For Retailers & Distributors
          </p>
          <h1 className="mb-4 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#ffffff' }}>
            B2B Partnerships
          </h1>
          <p className="max-w-[560px] text-[16px] font-light leading-[1.8]" style={{ color: '#A0A0A0' }}>
            For retailers, distributors and multi-location businesses looking for an ongoing supply
            partnership — not a one-off order.
          </p>
        </div>
      </div>

      <div style={{ padding: '64px 60px' }}>
        <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'start' }}>
          <div>
            <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Why Partner With Us</p>
            <h2 className="mb-8 font-display text-[32px] font-bold uppercase leading-tight tracking-[0.02em]" style={{ color: '#111111' }}>
              Built for Ongoing Supply
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

            <p className="text-[14px] leading-relaxed" style={{ color: '#6B6B6B' }}>
              Looking for a one-time bulk order for a club, school or team instead? Visit our{' '}
              <Link href="/wholesale" className="underline hover:text-[#e85d1a]">Wholesale page</Link>.
            </p>
          </div>

          <div>
            <WholesaleForm />
          </div>
        </div>
      </div>
    </div>
  )
}
