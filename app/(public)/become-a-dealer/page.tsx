import type { Metadata } from 'next'
import Link from 'next/link'
import { Store, Percent, Headphones, ChevronRight } from 'lucide-react'
import { WholesaleForm } from '../wholesale/WholesaleForm'

export const metadata: Metadata = {
  title: 'Become a Dealer — Mantra Sports CA',
  description: 'Become an authorized Mantra Sports dealer in Canada — dealer pricing, marketing support and priority stock.',
}

const PERKS = [
  {
    icon: Percent,
    title: 'Dealer Pricing',
    text: 'Preferred pricing tiers on our full catalogue, structured around your typical order volume.',
  },
  {
    icon: Store,
    title: 'Authorized Dealer Status',
    text: 'Listing as an authorized Mantra Sports dealer, with access to product images and marketing assets.',
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    text: 'A direct line to our team for stock checks, lead times, and resolving issues fast.',
  },
]

export default function BecomeADealerPage() {
  return (
    <div className="bg-white">
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>Become a Dealer</span>
        </nav>
      </div>

      <div style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ padding: '72px 60px' }}>
          <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>
            Join Our Dealer Network
          </p>
          <h1 className="mb-4 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#ffffff' }}>
            Become a Dealer
          </h1>
          <p className="max-w-[560px] text-[16px] font-light leading-[1.8]" style={{ color: '#A0A0A0' }}>
            Sports stores, cricket academies and pro shops across Canada — sell Mantra Sports equipment
            with dealer pricing and dedicated support.
          </p>
        </div>
      </div>

      <div style={{ padding: '64px 60px' }}>
        <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'start' }}>
          <div>
            <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Dealer Perks</p>
            <h2 className="mb-8 font-display text-[32px] font-bold uppercase leading-tight tracking-[0.02em]" style={{ color: '#111111' }}>
              What You Get
            </h2>

            <div className="mb-10 space-y-0" style={{ border: '1px solid #E0DFDB' }}>
              {PERKS.map((item, i) => (
                <div key={item.title} className="flex gap-4" style={{ padding: '24px', borderBottom: i < PERKS.length - 1 ? '1px solid #E0DFDB' : 'none' }}>
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
              <p className="mb-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: '#6B6B6B' }}>How It Works</p>
              <ol className="ml-5 list-decimal space-y-1.5 text-[14px]" style={{ color: '#333333' }}>
                <li>Submit the dealer application form</li>
                <li>Our team reviews your business details and expected order volume</li>
                <li>We confirm dealer pricing and set up your account</li>
              </ol>
            </div>
          </div>

          <div>
            <WholesaleForm />
          </div>
        </div>
      </div>
    </div>
  )
}
