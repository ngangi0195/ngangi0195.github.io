'use client'

import { useState, useMemo } from 'react'
import { BlogPost } from '@/lib/mdx'
import { BlogCard } from './BlogCard'

interface BlogSearchProps {
  posts: BlogPost[]
  allTags: string[]
}

export function BlogSearch({ posts, allTags }: BlogSearchProps) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = !activeTag || post.tags.includes(activeTag)
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      return matchesTag && matchesQuery
    })
  }, [posts, query, activeTag])

  return (
    <div>
      {/* Search bar */}
      <div className="blog-search-wrap">
        <span className="blog-search-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="blog-search-input"
        />
        {query && (
          <button className="blog-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div className="blog-tags">
        <button
          className={`blog-tag${!activeTag ? ' active' : ''}`}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`blog-tag${activeTag === tag ? ' active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="blog-empty">
          No posts found for &ldquo;{query}&rdquo;{activeTag && ` in #${activeTag}`}.
        </div>
      ) : (
        <div className="blog-grid">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
