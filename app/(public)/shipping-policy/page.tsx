import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getSiteSettings } from '@/lib/utils/settings'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shipping Policy — Mantra Sports CA',
  description: 'Shipping rates, delivery times and order tracking information for Mantra Sports Canada.',
}

export default async function ShippingPolicyPage() {
  const { shipping_processing_time, shipping_delivery_time, free_shipping_threshold } =
    await getSiteSettings(['shipping_processing_time', 'shipping_delivery_time', 'free_shipping_threshold'])

  return (
    <div className="bg-white">
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>Shipping Policy</span>
        </nav>
      </div>

      <div style={{ padding: '64px 60px', maxWidth: 800, margin: '0 auto' }}>
        <h1 className="mb-8 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#111111' }}>
          Shipping Policy
        </h1>

        <div
          className="mb-10 rounded-[2px] px-5 py-4 text-[13px] leading-relaxed"
          style={{ background: '#FFF8EE', border: '1px solid #F0D9B5', color: '#7A5B1E' }}
        >
          <strong>Draft policy — pending legal review.</strong> This page reflects our intended shipping process and
          should be reviewed against your actual carrier agreements before being treated as a binding customer
          policy.
        </div>

        <div className="space-y-8 text-[15px] leading-[1.85]" style={{ color: '#333333' }}>
          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Processing Time
            </h2>
            <p>Orders are typically processed and shipped within {shipping_processing_time} of payment confirmation. Custom or made-to-order items may take longer — estimated timelines are noted on the relevant product page.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Delivery Times
            </h2>
            <p>Standard delivery within Canada typically takes {shipping_delivery_time} depending on your location. Remote or rural areas may take longer. You&apos;ll receive a tracking number by email once your order ships.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Shipping Rates
            </h2>
            <p>Orders over ${free_shipping_threshold} CAD ship free within Canada. Orders under this threshold are charged a flat shipping rate, calculated at checkout based on your delivery address.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Wholesale & Bulk Orders
            </h2>
            <p>Delivery timelines and freight costs for wholesale and bulk team orders are confirmed individually with our team — see our <Link href="/wholesale" className="underline hover:text-[#e85d1a]">Wholesale page</Link> to get started.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Damaged or Lost Shipments
            </h2>
            <p>If your order arrives damaged or doesn&apos;t arrive within the expected window, contact us within 48 hours of the expected delivery date and we&apos;ll arrange a replacement or refund.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Questions
            </h2>
            <p>For anything not covered here, <Link href="/contact" className="underline hover:text-[#e85d1a]">get in touch</Link> — we&apos;re happy to help.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
