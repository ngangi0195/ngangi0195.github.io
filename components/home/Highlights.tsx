'use client'

import { useState } from 'react'

const STATS = [
  { n: '11K+',  l: 'Kato Users'          },
  { n: '$10K+', l: 'Project Lift Value'   },
  { n: '4',     l: 'ITPS Methods Shipped' },
  { n: '3',     l: 'Active Roles'         },
]

const CARDS = [
  {
    id: 'kato',
    category: 'Product',
    title: 'Kato — AI Study Platform',
    desc: 'Built and launched Kato, an AI-powered study tool that grew to 11,000+ users entirely through organic reach. Sole developer — full stack from database to deployment.',
    chips: ['Next.js', 'PostgreSQL', 'OpenAI API', 'Vercel', 'Solo Build'],
    stat: '11K+',
    statLabel: 'Organic Users',
    statNote: 'No paid marketing. Built, shipped, and grew entirely through word of mouth.',
    link: 'https://kato.study',
    linkLabel: 'kato.study ↗',
  },
  {
    id: 'lift',
    category: 'Organization',
    title: 'Project Lift — Student Dev Agency',
    desc: 'Co-founded and lead Project Lift, a student org delivering professional-grade web development to nonprofits and small businesses in the DMV — completely free of charge.',
    chips: ['President', 'UMD', 'Active Clients', 'Non-Profit'],
    stat: '$10K+',
    statLabel: 'Value Delivered',
    statNote: 'Pro-bono web development for local nonprofits and small businesses.',
    link: undefined,
    linkLabel: undefined,
  },
  {
    id: 'raas',
    category: 'Research',
    title: 'ITPS Adapted to UR3 Arm in MuJoCo',
    desc: 'Ported the ITPS framework (MIT CSAIL) to a UR3 robotic arm block-stacking task — validated all 4 steering methods with full CPU and CUDA support, enabling human-guided inference without retraining.',
    chips: ['RAAS Lab', 'MuJoCo', 'CUDA', 'MIT CSAIL', 'Python'],
    stat: '4',
    statLabel: 'Steering Methods',
    statNote: 'Post-Hoc, Diffusion, Sampling, and Initialization — all validated on CPU + CUDA.',
    link: undefined,
    linkLabel: undefined,
  },
  {
    id: 'umd',
    category: 'Academic',
    title: 'UMD Honors Program',
    desc: 'Admitted to and maintaining standing in the University Honors Program at UMD — while simultaneously conducting undergraduate research, co-founding a student org, and completing two SWE internships.',
    chips: ['University Honors', 'Dean\'s List', 'UMD CS'],
    stat: '3.9+',
    statLabel: 'GPA',
    statNote: 'Maintained academic excellence across research, internships, and org leadership.',
    link: undefined,
    linkLabel: undefined,
  },
]

export function Highlights() {
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx((i) => (i - 1 + CARDS.length) % CARDS.length)
  const next = () => setIdx((i) => (i + 1) % CARDS.length)

  return (
    <section className="section-root" id="highlights">
      <div className="section-bg" aria-hidden="true">
        <svg
          style={{ position: 'absolute', top: 20, right: 40, width: 180, height: 160, opacity: 0.035 }}
          viewBox="0 0 180 160" fill="none"
        >
          {([[30,30],[90,20],[150,50],[60,90],[130,110],[20,120],[170,20],[80,140]] as [number,number][]).map(([x,y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <line x1="0" y1="-7" x2="0" y2="7" stroke="#0c0c0c" strokeWidth="1.5"/>
              <line x1="-7" y1="0" x2="7" y2="0" stroke="#0c0c0c" strokeWidth="1.5"/>
              <line x1="-5" y1="-5" x2="5" y2="5" stroke="#0c0c0c" strokeWidth="1"/>
              <line x1="5" y1="-5" x2="-5" y2="5" stroke="#0c0c0c" strokeWidth="1"/>
            </g>
          ))}
        </svg>
        <svg
          style={{ position: 'absolute', bottom: 20, left: 36, width: 160, height: 100, opacity: 0.04 }}
          viewBox="0 0 160 100" fill="none"
        >
          <polyline points="10,90 40,70 70,50 100,30 140,10" stroke="#0c0c0c" strokeWidth="2" fill="none"/>
          <polygon points="140,10 128,18 136,26" fill="#0c0c0c"/>
          {([40,70,100] as number[]).map((x, i) => (
            <circle key={i} cx={x} cy={[70,50,30][i]} r="3" fill="#0c0c0c"/>
          ))}
        </svg>
      </div>

      {/* Section head with nav controls */}
      <div className="section-head">
        <div className="sh-left">
          <span className="sh-num">04</span>
          <span className="sh-title">Highlights</span>
        </div>
        <div className="hl-nav">
          <button className="hl-nav-btn" onClick={prev} aria-label="Previous">←</button>
          <span className="hl-counter">
            {String(idx + 1).padStart(2, '0')} / {String(CARDS.length).padStart(2, '0')}
          </span>
          <button className="hl-nav-btn" onClick={next} aria-label="Next">→</button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hl-stats">
        {STATS.map((s) => (
          <div key={s.l} className="hl-stat">
            <div className="hl-stat-n">{s.n}</div>
            <div className="hl-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Carousel */}
      <div className="hl-carousel">
        <div
          className="hl-track"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {CARDS.map((c) => (
            <div key={c.id} className="hl-slide">
              {/* Left: content */}
              <div className="hl-slide-left">
                <span className="hl-cat">{c.category}</span>
                <div className="hl-title">{c.title}</div>
                <div className="hl-desc">{c.desc}</div>
                <div className="hl-chips">
                  {c.chips.map((ch) => (
                    <span key={ch} className="hl-chip">{ch}</span>
                  ))}
                </div>
                {c.link && (
                  <a href={c.link} target="_blank" rel="noreferrer" className="hl-link">
                    {c.linkLabel}
                  </a>
                )}
              </div>

              {/* Right: big stat */}
              <div className="hl-slide-right">
                <div className="hl-big-n">{c.stat}</div>
                <div className="hl-big-l">{c.statLabel}</div>
                <div className="hl-big-note">{c.statNote}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="hl-dots">
        {CARDS.map((_, i) => (
          <button
            key={i}
            className={`hl-dot${i === idx ? ' active' : ''}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
