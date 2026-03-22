import Link from 'next/link'
import { BlogPost } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card-link">
      <article className="blog-card">
        <div className="blog-card-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="blog-card-tag">{tag}</span>
          ))}
        </div>
        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-meta">
          <span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {formatDate(post.date)}
          </span>
          <span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {post.readingTime}
          </span>
        </div>
      </article>
    </Link>
  )
}
