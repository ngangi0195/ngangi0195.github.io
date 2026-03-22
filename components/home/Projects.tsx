import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section className="section-root" id="projects">
      <div className="section-bg" aria-hidden="true">
        <svg
          style={{ position: 'absolute', top: 40, right: 30, width: 120, height: 200, opacity: 0.04 }}
          viewBox="0 0 120 200" fill="none"
        >
          <text x="0"  y="40"  fontSize="60" fill="#0c0c0c" fontFamily="monospace" fontWeight="700">{'{'}</text>
          <text x="70" y="160" fontSize="60" fill="#0c0c0c" fontFamily="monospace" fontWeight="700">{'}'}</text>
        </svg>
      </div>

      <div className="section-head">
        <div className="sh-left">
          <span className="sh-num">02</span>
          <span className="sh-title">Projects</span>
        </div>
        <span className="sh-right">{projects.length} builds</span>
      </div>

      <div className="roadmap-body">
        <div className="roadmap-wrap">
          <div className="roadmap-track" />

          <div className="roadmap-nodes">
            {projects.map((p, i) => {
              const isFeatured = !!p.featured
              const typeLabel = p.status === 'in-progress'
                ? 'In Progress'
                : isFeatured ? 'Featured' : 'Build'

              return (
                <div key={p.id} className={`roadmap-node${isFeatured ? ' rn-featured' : ''}`}>
                  <div className="node-dot-wrap">
                    <span className="node-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="node-card">
                    {/* Screenshot placeholder — replace with <img src="/projects/id.png" /> */}
                    <div className={`img-placeholder${isFeatured ? ' featured' : ''}`}
                      title={`Add screenshot to /public/projects/${p.id}.png`}>
                      {p.image
                        ? <img src={p.image} alt={p.title} />
                        : <span className="img-placeholder-label">
                            {p.demo ? p.demo.replace('https://', '') : 'screenshot'}
                          </span>
                      }
                    </div>

                    <div className="nc-type">{typeLabel}</div>
                    <div className="nc-title">
                      {p.title.split('—')[0].split('·')[0].trim()}
                    </div>
                    <div className="nc-desc">{p.description}</div>
                    <div className="nc-tags">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="nc-tag">{t}</span>
                      ))}
                    </div>
                    {(p.demo || p.github) && (
                      <a
                        href={p.demo ?? p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="nc-link"
                      >
                        {p.demo ? 'Live Demo ↗' : 'GitHub →'}
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
