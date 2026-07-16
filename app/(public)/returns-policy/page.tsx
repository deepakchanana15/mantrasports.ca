import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Returns Policy — Mantra Sports CA',
  description: 'Our 30-day returns policy, exchange process, and warranty information for Mantra Sports Canada.',
}

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-white">
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>Returns Policy</span>
        </nav>
      </div>

      <div style={{ padding: '64px 60px', maxWidth: 800, margin: '0 auto' }}>
        <h1 className="mb-8 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#111111' }}>
          Returns Policy
        </h1>

        <div
          className="mb-10 rounded-[2px] px-5 py-4 text-[13px] leading-relaxed"
          style={{ background: '#FFF8EE', border: '1px solid #F0D9B5', color: '#7A5B1E' }}
        >
          <strong>Draft policy — pending legal review.</strong> This page reflects our intended returns process
          and should be reviewed before being treated as a binding customer policy.
        </div>

        <div className="space-y-8 text-[15px] leading-[1.85]" style={{ color: '#333333' }}>
          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              30-Day Return Window
            </h2>
            <p>We accept returns within 30 days of delivery for unused items in their original condition and packaging, with proof of purchase.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              What Can&apos;t Be Returned
            </h2>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Custom or personalized apparel and equipment</li>
              <li>Items that show signs of use, including bats that have been knocked-in or played with</li>
              <li>Items missing original packaging or tags</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              How to Start a Return
            </h2>
            <p>Contact us via our <Link href="/contact" className="underline hover:text-[#e85d1a]">Contact page</Link> with your order number and reason for return. We&apos;ll confirm eligibility and provide return instructions.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Refunds
            </h2>
            <p>Once we receive and inspect your returned item, we&apos;ll notify you of approval and process your refund to the original payment method. Refunds typically appear within 5-10 business days depending on your bank.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Damaged or Defective Items
            </h2>
            <p>If an item arrives damaged or defective, contact us within 48 hours of delivery with photos. We&apos;ll cover the cost of return shipping and send a replacement or full refund.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
              Wholesale Orders
            </h2>
            <p>Returns and exchanges on bulk wholesale orders are handled case-by-case as part of your order agreement — contact your wholesale representative directly.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
