import type { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { contentItems, ContentItem, ContentCategory } from '@/data/content'

export const metadata: Metadata = {
  title: 'Personal',
  description: "What I'm reading, watching, building, and writing.",
}

const categoryLabel: Record<ContentCategory, string> = {
  book:     'Book',
  paper:    'Paper',
  podcast:  'Podcast',
  youtube:  'YouTube',
  music:    'Music',
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
    <main style={{ position: 'relative', overflow: 'hidden' }}>

        {/* ── Backdrop ── */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          {/* Stacked rectangles — top right (books/layers) */}
          <svg style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 360, opacity: 0.028 }}
            viewBox="0 0 300 360" fill="none" preserveAspectRatio="xMaxYMin meet">
            {[0,1,2,3,4,5,6].map((i) => (
              <rect key={i} x={i * 6} y={i * 26 + 20} width={260 - i * 12} height="16"
                stroke="#0c0c0c" strokeWidth="1" fill="none"/>
            ))}
            <line x1="0" y1="230" x2="260" y2="230" stroke="#0c0c0c" strokeWidth="1.5"/>
          </svg>
          {/* Grid dots — bottom left */}
          <svg style={{ position: 'absolute', bottom: 40, left: 20, width: 200, height: 140, opacity: 0.03 }}
            viewBox="0 0 200 140" fill="none">
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 9 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={col * 22 + 10} cy={row * 28 + 14} r="2.5" fill="#0c0c0c"/>
              ))
            )}
          </svg>
          {/* Corner bracket — top left */}
          <svg style={{ position: 'absolute', top: 32, left: 32, width: 40, height: 40, opacity: 0.06 }}
            viewBox="0 0 40 40" fill="none">
            <path d="M0,40 L0,0 L40,0" stroke="#0c0c0c" strokeWidth="2.5"/>
          </svg>
          {/* Corner bracket — bottom right */}
          <svg style={{ position: 'absolute', bottom: 32, right: 32, width: 40, height: 40, opacity: 0.06 }}
            viewBox="0 0 40 40" fill="none">
            <path d="M40,0 L40,40 L0,40" stroke="#0c0c0c" strokeWidth="2.5"/>
          </svg>
        </div>

        <div className="content-root" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div className="content-header">
            <div className="kicker" style={{ marginBottom: 20 }}>
              <span className="live-dot" />
              Personal · Continuously Updated
            </div>
            <h1 className="content-h1">
              What I&apos;m Into<br />&amp; Making
            </h1>
            <p className="content-subtitle">
              A running snapshot of what I&apos;m reading, watching, and building —
              books, papers, podcasts, and projects shaping how I think.
            </p>
          </div>

          {/* Into */}
          <div className="content-section">
            <div className="content-section-head">
              <div className="content-section-title">What I&apos;m Into</div>
              <div className="content-section-sub">
                {intoItems.length} items · books, papers, podcasts, channels
              </div>
            </div>
            <div className="content-grid">
              {intoItems.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="content-divider" />

          {/* Making */}
          <div className="content-section">
            <div className="content-section-head">
              <div className="content-section-title">What I&apos;m Making</div>
              <div className="content-section-sub">
                {makingItems.length} items · projects in progress
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
