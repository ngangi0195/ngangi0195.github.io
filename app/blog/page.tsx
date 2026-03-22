import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { getAllPosts, getAllTags } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Long-form writing on robotics, SLAM, computer vision, and systems programming.',
}

const TOPICS = [
  'Robotics', 'SLAM', 'Computer Vision', 'Motion Planning',
  'Sim-to-Real', 'Applied AI', 'Systems Eng', 'Policy Learning',
]

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const allTags = getAllTags()

  return (
    <>
      <Navbar />
      <main>
        <div className="content-root">

          {/* Header — content page layout, home page character */}
          <div className="content-header">
            <div className="kicker" style={{ marginBottom: 20 }}>
              <span className="live-dot" />
              Technical Blog
            </div>
            <h1 className="content-h1">Writing</h1>
            <p className="content-subtitle">
              Long-form breakdowns on robotics, SLAM, ML, and systems engineering —
              starting from the math, ending with working code.
            </p>
            <div className="blog-topics" style={{ marginTop: 20 }}>
              {TOPICS.map((t) => (
                <span key={t} className="blog-topic-chip">{t}</span>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="content-section">
            <div className="content-section-head">
              <div className="content-section-title">Posts</div>
              <div className="content-section-sub">
                {posts.length > 0 ? `${posts.length} published` : 'First post coming Spring 2026'}
              </div>
            </div>

            {posts.length > 0 ? (
              <BlogSearch posts={posts} allTags={allTags} />
            ) : (
              <div style={{
                padding: '48px 0',
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: 12, color: 'var(--muted)', lineHeight: 2,
                borderLeft: '3px solid var(--yellow)', paddingLeft: 20,
              }}>
                <div style={{ color: 'var(--ink)', fontWeight: 700, marginBottom: 6 }}>Writing in progress.</div>
                Covering ITPS steering methods, RAG pipeline architecture,<br />
                SLAM fundamentals, and ROS 2 patterns — dropping soon.
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
