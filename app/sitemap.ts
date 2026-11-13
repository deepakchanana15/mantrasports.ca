import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db/prisma'
import { SITE_CONFIG } from '@/lib/config/site'

export const revalidate = 86400

const STATIC_ROUTES = [
  '', 'shop', 'collections', 'wholesale', 'b2b', 'become-a-dealer',
  'about', 'blog', 'contact', 'faq', 'shipping-policy', 'returns-policy',
  'privacy-policy', 'terms-and-conditions',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.url

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: path ? `${base}/${path}` : base,
    lastModified: new Date(),
  }))

  let dynamicEntries: MetadataRoute.Sitemap = []

  try {
    const [products, categories, collections, posts] = await Promise.all([
      prisma.product.findMany({
        where: { status: 'ACTIVE' },
        select: { slug: true, updatedAt: true },
      }),
      prisma.category.findMany({ select: { slug: true } }),
      prisma.collection.findMany({ select: { slug: true } }),
      prisma.blogPost.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, updatedAt: true },
      }),
    ])

    dynamicEntries = [
      ...products.map((p) => ({ url: `${base}/shop/${p.slug}`, lastModified: p.updatedAt })),
      ...categories.map((c) => ({ url: `${base}/categories/${c.slug}` })),
      ...collections.map((c) => ({ url: `${base}/collections/${c.slug}` })),
      ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.updatedAt })),
    ]
  } catch {
    // Database not connected — return static routes only
  }

  return [...staticEntries, ...dynamicEntries]
}
