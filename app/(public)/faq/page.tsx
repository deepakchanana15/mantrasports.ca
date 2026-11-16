import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { FAQSchema } from '@/components/seo/JsonLd'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'FAQ – Wholesale Cricket Equipment Canada',
  description: 'Answers about wholesale and B2B cricket equipment orders in Canada: quotes, dealers, English willow grades, warranty and contact.',
  alternates: { canonical: '/faq' },
}

function buildFaqs(): { category: string; items: { q: string; a: string }[] }[] {
  return [
    {
      category: 'Ordering',
      items: [
        { q: 'Can I order online?', a: 'No. Mantra Sports Canada is a wholesale and B2B site. Send us an enquiry through the wholesale form, by email or on WhatsApp and we reply with a written quote.' },
        { q: 'Who can order from Mantra Sports Canada?', a: 'Cricket clubs, academies, schools, universities and retailers in Canada, including full-squad team orders.' },
        { q: 'How quickly will I get a quote?', a: 'Usually within one business day. The quote lists products, quantities, prices, shipping and the expected delivery time.' },
        { q: 'Can I become a dealer?', a: 'Yes. Apply through the Become a Dealer page and we will get back to you with dealer pricing and terms.' },
      ],
    },
    {
      category: 'Products',
      items: [
        { q: 'What grade of English willow do you use?', a: 'Our English willow bats range from Players’ Grade, the top grade, through Grade I and Grade II to Grade III, across the Magnitude, Raptor and Cobra ranges.' },
        { q: 'What else do you supply?', a: 'Batting and wicket-keeping gloves, leg guards, thigh guards, helmets, leather balls in red, white, pink and yellow, performance sportswear for teams, and accessories such as grips, kit bags and stumps.' },
        { q: 'What if a product has a manufacturing defect?', a: 'We replace items with manufacturing defects. Contact us with photos and your order details.' },
      ],
    },
    {
      category: 'Contact',
      items: [
        { q: 'How do I contact Mantra Sports?', a: 'Phone +1 (385) 601-3759, WhatsApp +1 (267) 901-6382, or use the contact and wholesale forms on this site.' },
      ],
    },
  ]
}

export default async function FaqPage() {
  const FAQS = buildFaqs()

  return (
    <div className="bg-white">
      <FAQSchema items={FAQS.flatMap((s) => s.items.map((i) => ({ question: i.q, answer: i.a })))} />
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
