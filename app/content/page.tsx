import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { contentItems, ContentItem, ContentCategory } from '@/data/content'

export const metadata: Metadata = {
  title: 'Content',
  description: "What I'm reading, watching, building, and writing.",
}

const categoryLabel: Record<ContentCategory, string> = {
  book:     'Book',
  paper:    'Paper',
  podcast:  'Podcast',
  youtube:  'YouTube',
  course:   'Course',
  video:    'Video',
  writeup:  'Write-up',
  project:  'Project',
  post:     'Post',
}

function ContentCard({ item }: { item: ContentItem }) {
  return (
    <div className="content-card">
      <div className="content-emoji">{item.emoji ?? '📌'}</div>
      <div className="content-card-body">
        <div className="content-card-top">
          <div>
            <span className="content-card-type">{categoryLabel[item.category]}</span>
            {item.inProgress && (
              <div className="content-card-wip">In Progress</div>
            )}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="content-card-ext-link"
              aria-label={`Open ${item.title}`}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
        <div className="content-card-title">
          {item.link ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              {item.title}
            </a>
          ) : item.title}
        </div>
        <div className="content-card-creator">{item.creator}</div>
        <div className="content-card-note">{item.note}</div>
      </div>
    </div>
  )
}

export default function ContentPage() {
  const intoItems   = contentItems.filter((i) => i.section === 'into')
  const makingItems = contentItems.filter((i) => i.section === 'making')

  return (
    <>
      <Navbar />
      <main>
        <div className="content-root">
          <div className="content-header">
            <div className="content-eyebrow">content</div>
            <h1 className="content-h1">
              What I&apos;m Into
              <br />
              &amp; Making
            </h1>
            <p className="content-subtitle">
              A curated snapshot of what I&apos;m reading, watching, and building — continuously updated.
            </p>
          </div>

          <div className="content-section">
            <div className="content-section-head">
              <div className="content-section-title">What I&apos;m Into</div>
              <div className="content-section-sub">
                Books, papers, podcasts, and channels shaping how I think right now.
              </div>
            </div>
            <div className="content-grid">
              {intoItems.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="content-divider" />

          <div className="content-section">
            <div className="content-section-head">
              <div className="content-section-title">What I&apos;m Making</div>
              <div className="content-section-sub">
                Videos, write-ups, and projects I&apos;m actively working on or have shipped.
              </div>
            </div>
            <div className="content-grid">
              {makingItems.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
