'use client'

import { useState, useEffect } from 'react'

const TAGLINES = [
  'Building intelligent systems.',
  'Autonomy · Perception · Systems.',
  'From simulation to the real world.',
  'ROS 2 · SLAM · Computer Vision.',
]

export function Hero() {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = TAGLINES[idx]
    let t: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 45)
    } else if (!deleting && displayed.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 25)
    } else {
      setDeleting(false)
      setIdx((i) => (i + 1) % TAGLINES.length)
    }

    return () => clearTimeout(t)
  }, [displayed, deleting, idx])

  return (
    <section className="hero-root" id="hero">
      {/* Background SVG decorations — absolute, scroll with page */}
      <div className="hero-bg" aria-hidden="true">
        {/* Circuit traces — top right */}
        <svg
          style={{ position: 'absolute', top: 60, right: 0, width: 340, height: 280, opacity: 0.055 }}
          viewBox="0 0 340 280" fill="none"
        >
          <path d="M340 40 H240 V100 H160 V180 H80 V240" stroke="#0c0c0c" strokeWidth="1.5" />
          <path d="M340 100 H280 V160 H200 V220" stroke="#0c0c0c" strokeWidth="1.5" />
          <circle cx="240" cy="40" r="4" fill="#0c0c0c" />
          <circle cx="240" cy="100" r="4" fill="#0c0c0c" />
          <circle cx="160" cy="100" r="4" fill="#0c0c0c" />
          <circle cx="160" cy="180" r="4" fill="#0c0c0c" />
          <circle cx="80" cy="180" r="4" fill="#0c0c0c" />
          <circle cx="280" cy="100" r="4" fill="#0c0c0c" />
          <circle cx="200" cy="160" r="4" fill="#0c0c0c" />
        </svg>

        {/* Robot arm silhouette — bottom left */}
        <svg
          style={{ position: 'absolute', bottom: 30, left: 20, width: 180, height: 160, opacity: 0.045 }}
          viewBox="0 0 180 160" fill="none"
        >
          <rect x="75" y="130" width="30" height="20" rx="2" stroke="#0c0c0c" strokeWidth="2" />
          <rect x="80" y="100" width="20" height="35" rx="2" stroke="#0c0c0c" strokeWidth="2" />
          <line x1="90" y1="100" x2="60" y2="60" stroke="#0c0c0c" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="8" stroke="#0c0c0c" strokeWidth="2" />
          <line x1="60" y1="52" x2="40" y2="20" stroke="#0c0c0c" strokeWidth="2.5" />
          <circle cx="40" cy="20" r="6" stroke="#0c0c0c" strokeWidth="2" />
          <line x1="90" y1="100" x2="120" y2="70" stroke="#0c0c0c" strokeWidth="2.5" />
          <circle cx="120" cy="70" r="8" stroke="#0c0c0c" strokeWidth="2" />
          <line x1="120" y1="62" x2="145" y2="30" stroke="#0c0c0c" strokeWidth="2.5" />
          <circle cx="145" cy="30" r="6" stroke="#0c0c0c" strokeWidth="2" />
        </svg>

        {/* Coordinate axes — mid area */}
        <svg
          style={{ position: 'absolute', top: '45%', left: '28%', width: 90, height: 90, opacity: 0.04 }}
          viewBox="0 0 100 100" fill="none"
        >
          <line x1="50" y1="90" x2="50" y2="10" stroke="#0c0c0c" strokeWidth="1.5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#0c0c0c" strokeWidth="1.5" />
          <polygon points="50,6 46,14 54,14" fill="#0c0c0c" />
          <polygon points="94,50 86,46 86,54" fill="#0c0c0c" />
        </svg>

        {/* Scatter / point cloud — upper left */}
        <svg
          style={{ position: 'absolute', top: 80, left: '36%', width: 160, height: 120, opacity: 0.038 }}
          viewBox="0 0 160 120" fill="none"
        >
          {[[20,30],[45,18],[70,55],[95,22],[120,70],[40,80],[80,95],[130,45],[155,15],[10,95],[60,40],[110,85]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#0c0c0c"/>
          ))}
          <line x1="10" y1="100" x2="155" y2="10" stroke="#0c0c0c" strokeWidth="1" strokeDasharray="4 4"/>
        </svg>

        {/* Sine wave — bottom center */}
        <svg
          style={{ position: 'absolute', bottom: 50, left: '20%', width: 300, height: 60, opacity: 0.035 }}
          viewBox="0 0 300 60" fill="none"
        >
          <path d="M0,30 C25,5 50,55 75,30 S125,5 150,30 S200,55 225,30 S275,5 300,30"
            stroke="#0c0c0c" strokeWidth="1.5" fill="none"/>
        </svg>

        {/* Corner bracket marks */}
        <svg
          style={{ position: 'absolute', bottom: 24, right: 24, width: 48, height: 48, opacity: 0.06 }}
          viewBox="0 0 48 48" fill="none"
        >
          <path d="M48,0 L48,48 L0,48" stroke="#0c0c0c" strokeWidth="2" fill="none"/>
        </svg>
        <svg
          style={{ position: 'absolute', top: 24, left: 24, width: 48, height: 48, opacity: 0.06 }}
          viewBox="0 0 48 48" fill="none"
        >
          <path d="M0,48 L0,0 L48,0" stroke="#0c0c0c" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      {/* ── LEFT COLUMN ── */}
      <div className="hero-left">
        <div>
          <div className="kicker">
            <span className="live-dot" />
            CS Student · Robotics · Software Eng
          </div>

          {/* Name + headshot side by side */}
          <div className="hero-name-row">
            <h1 className="hero-name">
              <span className="first">Nidhin</span>
              <span className="last">Gangisetty</span>
            </h1>
            {/* Place your headshot at /public/headshot.jpg */}
            <div className="hero-photo">
              <img src="/headshot.jpg" alt="Nidhin Gangisetty" />
              <span className="hero-photo-initials">NG</span>
            </div>
          </div>

          <p className="hero-intro">
            CS student at <strong>UMD</strong> building autonomous systems, AI pipelines, and full-stack products.
            Undergraduate researcher at <strong>RAAS Lab</strong>. Co-founder of <strong>Project Lift</strong>.
            Focused on the intersection of <strong>robotics, systems, and applied AI</strong>.
          </p>

          <div style={{
            marginBottom: 4,
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: 13,
            color: 'var(--muted)',
            minHeight: 22,
            letterSpacing: '0.02em',
          }}>
            {displayed}
            <span className="animate-blink" style={{ borderRight: '2px solid var(--muted)', marginLeft: 2 }}>&nbsp;</span>
          </div>

          {/* Currently */}
          <div className="hero-currently">
            <div className="currently-label">Currently</div>
            {[
              { text: 'Researcher @ RAAS Lab — adapting ITPS to UR3 arm in MuJoCo' },
              { text: 'President @ Project Lift — active client builds' },
              { text: 'Open to SWE & Robotics internships — Summer 2026' },
            ].map((item, i) => (
              <div key={i} className="currently-item">
                <span className="currently-arrow">▸</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-ctas">
          <a href="#projects"   className="btn-brut btn-fill">View Projects</a>
          <a href="#experience" className="btn-brut btn-outline">Experience</a>
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="hero-right">

        {/* ── Career Vision — dominant ── */}
        <div className="r-panel-vision">
          <div className="vision-kicker">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
            Career Vision
          </div>

          <div className="vision-headline">
            Building the Intelligent<br />Physical World
          </div>

          <div className="vision-body">
            I want to work at the frontier of <strong>robotics and AI</strong> — on systems
            that don&apos;t just process data but act in the physical world. My interest is in
            problems where theory meets hardware: <strong>perception pipelines</strong> that
            work in the wild, <strong>planners</strong> that generalize, and <strong>human-robot
            interfaces</strong> that feel natural. I&apos;m drawn to the full stack from
            simulation to deployment on real hardware.
          </div>

          <div className="vision-focus">
            <div className="vision-focus-label">Focus Areas</div>
            <div className="vision-focus-chips">
              {['Perception', 'Motion Planning', 'Dexterous Manipulation', 'Human-Robot Interaction', 'Sim-to-Real', 'Policy Learning'].map((f) => (
                <span key={f} className="vision-chip">{f}</span>
              ))}
            </div>
          </div>

          {/* Callout — pushed to bottom, expanded to fill remaining space */}
          <div className="vision-callout" style={{ marginTop: 'auto' }}>
            <div style={{ width: '100%' }}>
              <div style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: 8, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#888',
                marginBottom: 10,
              }}>
                Long-Term Goal
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>
                Build manipulation systems that generalize across unstructured environments
                without task-specific retraining — bridging the gap between simulation
                and robust real-world deployment.
              </div>
              <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 12 }}>
                <div style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: 8, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#888',
                  marginBottom: 8,
                }}>
                  Active Research
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.7, color: '#bbb' }}>
                  Adapting ITPS (MIT CSAIL) to UR3 robotic arm block-stacking in MuJoCo.
                  Validated 4 steering methods with CPU + CUDA support — RAAS Lab, UMD.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Facts + Stack — compact bottom row ── */}
        <div className="r-panel-bottom">
          <div>
            <div className="panel-eyebrow">Quick Facts</div>
            {[
              { k: 'School',   v: 'UMD Honors', accent: false },
              { k: 'Research', v: 'RAAS Lab',    accent: false },
              { k: 'Kato',     v: '11k+ visits', accent: true  },
              { k: 'Lift',     v: '$10K+ value', accent: true  },
            ].map((f) => (
              <div className="fact-row" key={f.k}>
                <span className="fk">{f.k}</span>
                <span className={`fv${f.accent ? ' fv-red' : ''}`}>{f.v}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="panel-eyebrow">Core Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {['Python', 'ROS 2', 'C++', 'PyTorch', 'Next.js', 'TypeScript', 'PostgreSQL', 'AWS'].map((s, i) => (
                <span key={s} className={`stag${i < 3 ? ' stag-on' : ''}`}>{s}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
