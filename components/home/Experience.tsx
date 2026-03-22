import { experience } from '@/data/experience'

export function Experience() {
  return (
    <section className="section-root" id="experience">
      <div className="section-bg" aria-hidden="true">

        {/* Binary columns — right side */}
        <svg
          style={{ position: 'absolute', top: 0, right: 40, width: 200, height: '100%', opacity: 0.025 }}
          viewBox="0 0 200 600" fill="none" preserveAspectRatio="xMaxYMin meet"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <text key={i} x={i % 2 === 0 ? 20 : 90} y={i * 26 + 20}
              fontSize="9" fill="#0c0c0c" fontFamily="monospace">
              {i % 3 === 0 ? '10110100' : i % 3 === 1 ? '01001011' : '11010010'}
            </text>
          ))}
        </svg>

        {/* Waveform / signal lines — bottom left */}
        <svg
          style={{ position: 'absolute', bottom: 20, left: 30, width: 260, height: 80, opacity: 0.04 }}
          viewBox="0 0 260 80" fill="none"
        >
          <polyline points="0,40 20,40 30,10 50,70 70,10 90,70 110,40 140,40 150,15 170,65 190,15 210,65 230,40 260,40"
            stroke="#0c0c0c" strokeWidth="2" fill="none"/>
          <polyline points="0,55 25,55 35,35 55,75 75,35 95,75 115,55 145,55"
            stroke="#0c0c0c" strokeWidth="1.2" fill="none" opacity="0.5"/>
        </svg>

        {/* Grid / matrix — top left corner */}
        <svg
          style={{ position: 'absolute', top: 16, left: 0, width: 120, height: 120, opacity: 0.035 }}
          viewBox="0 0 120 120" fill="none"
        >
          {[0,1,2,3,4].map(row =>
            [0,1,2,3,4].map(col => (
              <rect key={`${row}-${col}`}
                x={col * 22 + 4} y={row * 22 + 4}
                width="16" height="16"
                stroke="#0c0c0c" strokeWidth="1"
                fill={(row + col) % 3 === 0 ? '#0c0c0c' : 'none'}
                fillOpacity="0.4"
              />
            ))
          )}
        </svg>

        {/* Trajectory arc — mid right */}
        <svg
          style={{ position: 'absolute', top: '30%', right: 0, width: 160, height: 200, opacity: 0.04 }}
          viewBox="0 0 160 200" fill="none"
        >
          <path d="M160,0 Q40,100 160,200" stroke="#0c0c0c" strokeWidth="1.5" fill="none"/>
          <path d="M160,20 Q60,100 160,180" stroke="#0c0c0c" strokeWidth="1" fill="none"/>
          <circle cx="160" cy="0"   r="4" fill="#0c0c0c"/>
          <circle cx="160" cy="200" r="4" fill="#0c0c0c"/>
          <circle cx="50"  cy="100" r="3" fill="#0c0c0c"/>
        </svg>

        {/* Bracket labels — decorative */}
        <svg
          style={{ position: 'absolute', bottom: 0, right: 200, width: 100, height: 60, opacity: 0.04 }}
          viewBox="0 0 100 60" fill="none"
        >
          <text x="0" y="20" fontSize="11" fill="#0c0c0c" fontFamily="monospace">SWE</text>
          <text x="0" y="38" fontSize="11" fill="#0c0c0c" fontFamily="monospace">RESEARCH</text>
          <line x1="0" y1="44" x2="80" y2="44" stroke="#0c0c0c" strokeWidth="1"/>
        </svg>

      </div>

      <div className="section-head">
        <div className="sh-left">
          <span className="sh-num">01</span>
          <span className="sh-title">Experience</span>
        </div>
        <span className="sh-right">{experience.length} roles</span>
      </div>

      <div>
        {experience.map((e, i) => (
          <div key={i} className="exp-row">
            <div className="exp-date">
              <div>{e.startDate}</div>
              <div>—</div>
              <div className={e.endDate === 'Present' ? 'exp-now' : ''}>{e.endDate}</div>
              <div style={{ marginTop: 8, fontSize: 9, letterSpacing: '0.04em', color: 'var(--muted)' }}>
                {e.location}
              </div>
            </div>

            <div className="exp-main">
              <div className="exp-top">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div className="logo-placeholder" title="Add logo to /public/logos/">
                    {e.org[0]}
                  </div>
                  <div>
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-org">{e.org}</div>
                  </div>
                </div>
                <div className="exp-tags">
                  {e.tags.map((t) => (
                    <span key={t} className="etag">{t}</span>
                  ))}
                </div>
              </div>
              <ul className="exp-bullets">
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
