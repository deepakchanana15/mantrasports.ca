import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ — Mantra Sports CA',
  description: 'Answers to common questions about ordering, shipping, returns and wholesale at Mantra Sports Canada.',
}

const FAQS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: 'Orders & Products',
    items: [
      {
        q: 'What grade of English willow do you use?',
        a: 'Our premium range uses Grade I–III English willow, hand-selected and finished by experienced bat makers. Grade and finish details are listed on each product page.',
      },
      {
        q: 'Do you sell Kashmir willow bats too?',
        a: 'Yes — alongside our English willow range, we stock Kashmir willow bats for players looking for a more budget-friendly option without sacrificing durability.',
      },
      {
        q: 'Can I get a custom weight or grip on a bat?',
        a: 'Some bats support custom weight and grip selection at checkout. For fully custom requests, reach out via our Contact page and our team will confirm what’s possible.',
      },
    ],
  },
  {
    category: 'Shipping',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Most orders ship within 1-2 business days and arrive within 3-7 business days depending on your location in Canada. See our Shipping Policy for full details.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes — orders over $150 CAD ship free within Canada. Orders under that threshold have a flat shipping rate calculated at checkout.',
      },
      {
        q: 'Do you ship outside Canada?',
        a: 'We currently focus on Canada-wide delivery. If you need equipment shipped internationally, contact us and we’ll see what we can arrange.',
      },
    ],
  },
  {
    category: 'Returns & Warranty',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy on unused items in original condition. See our Returns Policy page for the full process and exceptions.',
      },
      {
        q: 'What if my bat arrives damaged?',
        a: 'Contact us within 48 hours of delivery with photos of the damage and we’ll arrange a replacement or refund at no cost to you.',
      },
    ],
  },
  {
    category: 'Wholesale & Teams',
    items: [
      {
        q: 'Do you offer wholesale pricing for clubs and schools?',
        a: 'Yes — we work with cricket clubs, schools, academies and retailers on volume pricing. Visit our Wholesale page to submit an enquiry.',
      },
      {
        q: 'Can you supply custom team apparel?',
        a: 'Yes, custom apparel with team branding is available for bulk orders. Let us know your requirements through the wholesale enquiry form.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>FAQ</span>
        </nav>
      </div>

      {/* Hero */}
      <div style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ padding: '64px 60px' }}>
          <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>
            Help Centre
          </p>
          <h1 className="mb-4 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: '#ffffff' }}>
            Frequently Asked Questions
          </h1>
          <p className="max-w-[560px] text-[16px] font-light leading-[1.8]" style={{ color: '#A0A0A0' }}>
            Can&apos;t find what you&apos;re looking for? <Link href="/contact" className="underline hover:text-white">Get in touch</Link> and we&apos;ll help directly.
          </p>
        </div>
      </div>

      {/* FAQ list */}
      <div style={{ padding: '64px 60px', maxWidth: 860, margin: '0 auto' }}>
        {FAQS.map((section) => (
          <div key={section.category} className="mb-10">
            <h2 className="mb-4 font-display text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: '#e85d1a' }}>
              {section.category}
            </h2>
            <div style={{ border: '1px solid #E0DFDB' }}>
              {section.items.map((item, i) => (
                <details
                  key={item.q}
                  className="group"
                  style={{ borderBottom: i < section.items.length - 1 ? '1px solid #E0DFDB' : 'none' }}
                >
                  <summary
                    className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-medium"
                    style={{ color: '#111111' }}
                  >
                    {item.q}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" style={{ color: '#e85d1a' }} />
                  </summary>
                  <div className="px-5 pb-4 text-[14px] leading-relaxed" style={{ color: '#6B6B6B' }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
