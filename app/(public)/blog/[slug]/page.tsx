import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { formatDate } from '@/lib/utils/format'
import { sanitizeHtml } from '@/lib/utils/sanitize'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, status: 'PUBLISHED' },
      select: { title: true, metaTitle: true, metaDescription: true, excerpt: true },
    })
    if (!post) return {}
    return {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt ?? undefined,
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let post: Awaited<ReturnType<typeof getPost>> | null = null
  try {
    post = await getPost(slug)
  } catch {
    notFound()
  }

  if (!post) notFound()

  return (
    <div className="bg-white">
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="transition-colors hover:text-[#e85d1a]">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>{post.title}</span>
        </nav>
      </div>

      <article style={{ padding: '56px 60px 80px', maxWidth: 760, margin: '0 auto' }}>
        <header className="mb-8">
          {post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map(({ category }) => (
                <span
                  key={category.id}
                  className="rounded-[2px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: '#e85d1a' }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
          <h1 className="mb-3 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(30px, 4vw, 46px)', color: '#111111' }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-[13px]" style={{ color: '#999999' }}>
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.author?.name && (
              <>
                <span aria-hidden="true">·</span>
                <span>By {post.author.name}</span>
              </>
            )}
          </div>
        </header>

        {post.featuredImageUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="mb-8 w-full rounded-[2px] object-cover"
            style={{ maxHeight: 480 }}
          />
        )}

        {post.content && (
          <div
            className="prose max-w-none text-[16px] leading-[1.85]"
            style={{ color: '#333333' }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />
        )}

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2" style={{ borderTop: '1px solid #E0DFDB', paddingTop: '24px' }}>
            {post.tags.map(({ tag }) => (
              <span key={tag.id} className="rounded border border-[#E0DFDB] px-2 py-0.5 text-[11px]" style={{ color: '#6B6B6B' }}>
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wider" style={{ color: '#e85d1a' }}>
            ← Back to Blog
          </Link>
        </div>
      </article>
    </div>
  )
}

async function getPost(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug, status: 'PUBLISHED' },
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true,
      featuredImageUrl: true,
      publishedAt: true,
      author: { select: { name: true } },
      categories: { select: { category: { select: { id: true, name: true } } } },
      tags: { select: { tag: { select: { id: true, name: true } } } },
    },
  })
}
