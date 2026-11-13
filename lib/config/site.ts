import type { NavItem } from '@/types'

// ─── Core Site Configuration ─────────────────────────────────────────────────
export const SITE_CONFIG = {
  name: 'Mantra Sports CA',
  tagline: 'Performance. Got. Simplified.',
  description:
    'Mantra Sports Canada — wholesale and B2B supply of premium cricket bats, protective gear, balls, performance sportswear and accessories for Canadian clubs, academies, schools and retailers.',
  url: 'https://www.mantrasports.ca',
  locale: 'en-CA',
  region: 'ca',
  currency: 'CAD',
  currencySymbol: '$',

  contact: {
    email: process.env.EMAIL_TO ?? 'info@mantrasports.ca',
    phone: '+1 (385) 601-3759',
    address: 'TO_BE_PROVIDED',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+12679016382',
  },

  social: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
    youtube: '#',
  },

  seo: {
    titleTemplate: '%s | Mantra Sports CA',
    defaultTitle: 'Wholesale Cricket Equipment Canada | Mantra Sports',
    defaultDescription:
      'Wholesale cricket equipment for Canadian clubs, academies, schools and retailers: English willow bats, protective gear, balls and sportswear. Request a quote.',
    defaultOgImage: '/images/og-default.jpg',
    twitterHandle: '@mantrasports',
  },
} as const

// ─── WhatsApp Helpers ─────────────────────────────────────────────────────────

export function getWhatsAppUrl(message?: string): string {
  const number = SITE_CONFIG.contact.whatsapp.replace(/\D/g, '')
  const encoded = encodeURIComponent(
    message ?? 'Hi, I would like to know more about Mantra Sports products.'
  )
  return `https://wa.me/${number}?text=${encoded}`
}

export function getProductWhatsAppUrl(productName: string): string {
  const message = `Hi, I'm interested in ${productName}. Could you give me more information?`
  return getWhatsAppUrl(message)
}

// ─── Navigation ────────────────────────────────────────────────────────────────

export const MAIN_NAV: NavItem[] = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'All Products', href: '/shop' },
      { label: 'Cricket Bats', href: '/categories/cricket-bats' },
      { label: 'Protective Gear', href: '/categories/protective-gear' },
      { label: 'Balls', href: '/categories/balls' },
      { label: 'Accessories', href: '/categories/accessories' },
      { label: 'Performance Sportswear', href: '/categories/custom-apparel' },
    ],
  },
  {
    label: 'Collections',
    href: '/collections',
  },
  {
    label: 'Wholesale',
    href: '/wholesale',
    children: [
      { label: 'Wholesale Enquiry', href: '/wholesale' },
      { label: 'B2B Partnerships', href: '/b2b' },
      { label: 'Become a Dealer', href: '/become-a-dealer' },
    ],
  },
  {
    label: 'About Us',
    href: '/about',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export const FOOTER_NAV = {
  products: {
    title: 'Products',
    links: [
      { label: 'Cricket Bats', href: '/categories/cricket-bats' },
      { label: 'Protective Gear', href: '/categories/protective-gear' },
      { label: 'Balls', href: '/categories/balls' },
      { label: 'Accessories', href: '/categories/accessories' },
      { label: 'Performance Sportswear', href: '/categories/custom-apparel' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Wholesale', href: '/wholesale' },
      { label: 'B2B Partnerships', href: '/b2b' },
      { label: 'Become a Dealer', href: '/become-a-dealer' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  support: {
    title: 'Help & Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping Policy', href: '/shipping-policy' },
      { label: 'Returns Policy', href: '/returns-policy' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
}

// ─── Product Categories ───────────────────────────────────────────────────────

export const DEFAULT_CATEGORIES = [
  { name: 'Cricket Bats', slug: 'cricket-bats', sortOrder: 1 },
  { name: 'Protective Gear', slug: 'protective-gear', sortOrder: 2 },
  { name: 'Balls', slug: 'balls', sortOrder: 3 },
  { name: 'Accessories', slug: 'accessories', sortOrder: 4 },
  { name: 'Teamwear', slug: 'teamwear', sortOrder: 5 },
  { name: 'Custom Apparel', slug: 'custom-apparel', sortOrder: 6 },
] as const

// ─── Default Site Settings ────────────────────────────────────────────────────

export const DEFAULT_SITE_SETTINGS = {
  hero_image_url: '',
  site_name: 'Mantra Sports CA',
  site_tagline: 'Performance. Got. Simplified.',
  site_description: SITE_CONFIG.description,
  contact_email: 'info@mantrasports.ca',
  contact_phone: '+1 (385) 601-3759',
  contact_address: 'TO_BE_PROVIDED',
  whatsapp_number: '+12679016382',
  social_instagram: '',
  social_facebook: '',
  social_linkedin: '',
  social_youtube: '',
  social_twitter: '',
  social_tiktok: '',
  social_pinterest: '',
  footer_text: `© ${new Date().getFullYear()} Mantra Sports. All rights reserved.`,
  meta_title: SITE_CONFIG.seo.defaultTitle,
  meta_description: SITE_CONFIG.seo.defaultDescription,
  legal_business_name: 'Mantra Sports CA',
  legal_governing_region: 'Ontario, Canada',
  shipping_processing_time: '1-2 business days',
  shipping_delivery_time: '3-7 business days',
  free_shipping_threshold: '150',
  return_window_days: '30',
  response_time_hours: '24',
} as const
