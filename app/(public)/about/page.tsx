import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Truck, Users, ShieldCheck, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us — Mantra Sports CA',
  description:
    'Mantra Sports CA brings premium, English willow cricket equipment to players and clubs across Canada — built for performance, backed by service.',
}

const VALUES = [
  {
    icon: Award,
    title: 'Craftsmanship First',
    text: 'Every bat is hand-selected from genuine English willow and finished by experienced craftsmen — not mass-produced.',
  },
  {
    icon: Users,
    title: 'Player-Led',
    text: 'Our range is shaped by feedback from club players, coaches and academies — equipment tested where it matters, on the field.',
  },
  {
    icon: Truck,
    title: 'Built for Bulk Orders',
    text: 'Quotes for clubs, schools, academies and retailers outfitting a whole squad, with sizing help before you order.',
  },
  {
    icon: ShieldCheck,
    title: 'Standing Behind Every Order',
    text: 'Clear stock information, replacement for manufacturing defects, and a team that actually answers when you reach out.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>About Us</span>
        </nav>
      </div>

      {/* Hero */}
      <div style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ padding: '64px 60px' }}>
          <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>
            Our Story
          </p>
          <h1 className="mb-4 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: '#ffffff' }}>
            About Mantra Sports
          </h1>
          <p className="max-w-[560px] text-[16px] font-light leading-[1.8]" style={{ color: '#A0A0A0' }}>
            Premium cricket equipment for players, clubs and schools across Canada — built for performance,
            backed by people who care about the game.
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '64px 60px', maxWidth: 900, margin: '0 auto' }}>
        <p className="mb-6 text-[16px] leading-[1.9]" style={{ color: '#333333' }}>
          Mantra Sports brings genuine English willow cricket bats, protective gear, balls and performance sportswear to clubs
          across Canada — from weekend club cricketers to school and university teams building out a full kit
          order. We work directly with experienced bat makers to source Players’ Grade to Grade III English willow, so every bat
          that reaches a Canadian crease has been hand-selected and finished properly, not mass-produced.
        </p>
        <p className="mb-6 text-[16px] leading-[1.9]" style={{ color: '#333333' }}>
          Cricket in Canada is growing fast, and equipment shouldn&apos;t be the bottleneck. That&apos;s why we
          carry a full range — bats, pads, gloves, helmets, balls and performance sportswear — with wholesale pricing
          for clubs, schools and dealers who need to outfit a whole squad, not just one player.
        </p>
        <p className="mb-10 text-[16px] leading-[1.9]" style={{ color: '#333333' }}>
          We&apos;re a small, hands-on team. If you have a question about sizing, bulk pricing, or which bat suits
          your game, you&apos;ll hear back from an actual person — not a ticket queue.
        </p>

        <div className="grid gap-0 sm:grid-cols-2" style={{ border: '1px solid #E0DFDB' }}>
          {VALUES.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-4"
              style={{
                padding: '28px',
                borderRight: i % 2 === 0 ? '1px solid #E0DFDB' : 'none',
                borderBottom: i < VALUES.length - 2 ? '1px solid #E0DFDB' : 'none',
              }}
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px]" style={{ background: '#FFF5ED' }}>
                <item.icon className="h-4 w-4" style={{ color: '#e85d1a' }} />
              </div>
              <div>
                <h3 className="mb-1 font-display text-[15px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
                  {item.title}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: '#6B6B6B' }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[2px] font-display text-[14px] font-medium uppercase tracking-[0.1em] text-white transition-colors"
            style={{ background: '#e85d1a', padding: '14px 36px' }}
          >
            Get in Touch <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
