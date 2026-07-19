import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { compileMDX } from '@/lib/compile-mdx'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { Footer } from '@/components/layout/Footer'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const Content = await compileMDX(post.content)

  return (
    <>
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossOrigin="anonymous" />
      <main>
        <div className="blog-post-root">
          <div className="blog-post-layout">
            <div>
              <Link href="/blog" className="blog-back">Back to Blog</Link>

              <div className="blog-post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-post-tag">{tag}</span>
                ))}
              </div>

              <h1 className="blog-post-title">{post.title}</h1>

              <div className="blog-post-meta">
                <span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {formatDate(post.date)}
                </span>
                <span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {post.readingTime}
                </span>
              </div>

              <article className="prose">
                <Content components={mdxComponents} />
              </article>
            </div>

            <TableOfContents />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
