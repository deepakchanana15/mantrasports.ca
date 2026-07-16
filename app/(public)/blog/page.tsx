import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { formatDate } from '@/lib/utils/format'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Cricket tips, product news and stories from Mantra Sports Canada.',
}

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = []
  let dbError = false

  try {
    posts = await getPosts()
  } catch {
    dbError = true
  }

  return (
    <div className="bg-white">
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>Blog</span>
        </nav>
      </div>

      <div style={{ padding: '48px 60px 32px' }}>
        <h1 className="mb-2 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(34px, 4vw, 52px)', color: '#111111' }}>
          Blog
        </h1>
        <p className="text-[15px]" style={{ color: '#6B6B6B' }}>Cricket tips, product news and stories from the crease.</p>
      </div>

      <div style={{ padding: '0 60px 80px' }}>
        {dbError && (
          <div className="mb-8 rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            Database connection unavailable. Posts will appear once the database is set up.
          </div>
        )}

        {posts.length === 0 && !dbError ? (
          <div className="py-24 text-center">
            <p className="font-display text-xl font-bold uppercase text-[#111]">No Posts Yet</p>
            <p className="mt-2 text-sm text-[#999]">Check back soon for cricket tips and product news.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F8F7F4]">
                  {post.featuredImageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={post.featuredImageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl" aria-hidden="true">📝</div>
                  )}
                </div>
                <div className="pt-4">
                  {post.publishedAt && (
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: '#e85d1a' }}>
                      {formatDate(post.publishedAt)}
                    </p>
                  )}
                  <h2 className="mb-1.5 font-display text-[18px] font-semibold uppercase leading-tight tracking-[0.01em] transition-colors group-hover:text-[#e85d1a]" style={{ color: '#111111' }}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: '#6B6B6B' }}>{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

async function getPosts() {
  return prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImageUrl: true,
      publishedAt: true,
    },
  })
}
