import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Coming Soon',
  description: 'Long-form writing on robotics, AI, and systems engineering. Coming soon.',
}

export default function BlogIndexPage() {
  return (
    <main className="blog-soon-root">

        {/* Corner brackets */}
        <svg aria-hidden="true" className="blog-soon-bracket blog-soon-bracket-tl" viewBox="0 0 40 40" fill="none">
          <path d="M0,40 L0,0 L40,0" stroke="currentColor" strokeWidth="2.5"/>
        </svg>
        <svg aria-hidden="true" className="blog-soon-bracket blog-soon-bracket-br" viewBox="0 0 40 40" fill="none">
          <path d="M40,0 L40,40 L0,40" stroke="currentColor" strokeWidth="2.5"/>
        </svg>

        <div className="blog-soon-inner">

          <div className="kicker" style={{ marginBottom: 20 }}>
            <span className="live-dot" />
            Technical Blog
          </div>

          <h1 className="blog-soon-h1">Writing.<br /><span className="blog-soon-h1-sub">Coming soon.</span></h1>

          <p className="blog-soon-desc">
            Long-form breakdowns on robotics, AI, and systems engineering —
            starting from the math, ending with working code.
          </p>

        </div>
    </main>
  )
}
