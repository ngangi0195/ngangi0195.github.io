import { activities } from '@/data/activities'

export function Activities() {
  return (
    <section className="section-root" id="activities">
      <div className="section-head">
        <div className="sh-left">
          <span className="sh-num">03</span>
          <span className="sh-title">Activities</span>
        </div>
        <span className="sh-right">{activities.length} entries</span>
      </div>

      <div className="act-grid">
        {activities.map((a, i) => (
          <div key={i} className="act-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
              <div>
                <div className="ac-title">{a.title}</div>
                <div className="ac-role">{a.role}</div>
              </div>
              {/* Logo placeholder — add logo to /public/logos/activity-name.png */}
              <div className="logo-placeholder" title="Add logo to /public/logos/">
                {a.title[0]}
              </div>
            </div>
            <div className="ac-date">{a.date}</div>
            <div className="ac-desc">{a.description}</div>

            {a.highlights && a.highlights.length > 0 && (
              <div className="ac-updates">
                <div className="ac-updates-label">Highlights</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {a.highlights.map((h, j) => (
                    <span key={j} className="highlight-chip">{h}</span>
                  ))}
                </div>
              </div>
            )}

            {a.link && (
              <a href={a.link} target="_blank" rel="noreferrer" className="ac-link">
                {a.linkLabel ?? 'Learn More'} ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
