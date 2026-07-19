import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { BlogCard } from '@/components/blog/BlogCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Long-form writing on robotics, AI, and systems engineering.',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main className="blog-index-root">
      <div className="blog-index-inner">
        <div className="kicker" style={{ marginBottom: '1rem' }}>
          <span className="live-dot" />
          Technical Blog
        </div>
        <h1 className="blog-index-h1">Writing</h1>
        <p className="blog-index-desc">
          Long-form breakdowns on robotics, AI, and systems engineering —
          starting from the math, ending with working code.
        </p>

        <div className="blog-index-list">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}
