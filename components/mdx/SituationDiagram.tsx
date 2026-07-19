'use client'

// Beach scene illustration for the Kalman Filter blog post.
// Wave is modeled as h_k = 2·sin(π/6 · k) with amplitude=22px, period=360px in SVG space.
// Robot sensor position: (112, 256). Kid 1 (tracked) at wave crest (590, 163).

const WAVE_FILL = [
  'M 135,207',
  'C 163,194 202,183 230,183',
  'C 258,183 292,194 320,205',
  'C 348,216 382,227 410,227',
  'C 438,227 472,216 500,205',
  'C 528,194 562,183 590,183',
  'C 618,183 652,194 680,205',
  'C 708,216 742,227 770,227',
  'L 820,230 L 820,400 L 135,400 Z',
].join(' ')

const WAVE_LINE = [
  'M 135,207',
  'C 163,194 202,183 230,183',
  'C 258,183 292,194 320,205',
  'C 348,216 382,227 410,227',
  'C 438,227 472,216 500,205',
  'C 528,194 562,183 590,183',
  'C 618,183 652,194 680,205',
  'C 708,216 742,227 770,227',
  'L 820,230',
].join(' ')

// Tracking cone: tip at robot sensor (112, 256), fan to kid 1 at (590, 163), half-width 25px
const CONE = 'M 112,256 L 595,188 L 585,138 Z'

interface Props {
  labeled?: boolean
  caption?: string
}

export function SituationDiagram({ labeled = false, caption }: Props) {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 820 400"
        width="100%"
        style={{ display: 'block', borderRadius: 12 }}
        aria-label="Beach scene with robot lifeguard monitoring swimmers using Kalman Filter"
      >
        <defs>
          <marker id="sd-arrow" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#555" />
          </marker>
          <marker id="sd-arrow-red" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#c84e30" />
          </marker>
          <marker id="sd-arrow-green" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#2e9e5a" />
          </marker>
        </defs>

        {/* ── Sky ── */}
        <rect width="820" height="400" fill="#c9e8f7" />

        {/* ── Ocean (below wave surface) ── */}
        <path d={WAVE_FILL} fill="#3a7bbf" />

        {/* ── Sandy beach (left strip, drawn over ocean) ── */}
        <polygon points="0,0 148,0 126,400 0,400" fill="#f2e07a" />
        {/* Shoreline edge */}
        <line x1="148" y1="0" x2="126" y2="400" stroke="#d4c048" strokeWidth="1.5" />

        {/* ── Wave surface line ── */}
        <path d={WAVE_LINE} fill="none" stroke="#1e4d8c" strokeWidth="2.5" />

        {/* ── Tracking cone (orange) ── */}
        <path d={CONE} fill="rgba(240,160,0,0.18)" />
        <line x1="112" y1="256" x2="595" y2="188" stroke="#e08a10" strokeWidth="1.8" />
        <line x1="112" y1="256" x2="585" y2="138" stroke="#e08a10" strokeWidth="1.8" />

        {/* ══ Robot (at beach x≈88) ══ */}
        {/* Base platform / treads */}
        <rect x="54" y="325" width="68" height="11" rx="4" fill="#9aa0aa" stroke="#4a5060" strokeWidth="1.2" />
        {/* Legs */}
        <rect x="66" y="307" width="13" height="21" rx="2" fill="#b0b8c2" stroke="#4a5060" strokeWidth="1" />
        <rect x="97" y="307" width="13" height="21" rx="2" fill="#b0b8c2" stroke="#4a5060" strokeWidth="1" />
        {/* Body */}
        <rect x="57" y="263" width="62" height="47" rx="6" fill="#d2d8e0" stroke="#4a5060" strokeWidth="1.5" />
        {/* Left arm */}
        <line x1="57" y1="277" x2="38" y2="297" stroke="#9aa0aa" strokeWidth="3.5" strokeLinecap="round" />
        {/* Right arm (extended toward water) */}
        <line x1="119" y1="277" x2="138" y2="297" stroke="#9aa0aa" strokeWidth="3.5" strokeLinecap="round" />
        {/* Head */}
        <rect x="62" y="232" width="52" height="34" rx="6" fill="#dde2ea" stroke="#4a5060" strokeWidth="1.5" />
        {/* Antenna */}
        <line x1="88" y1="232" x2="88" y2="215" stroke="#555" strokeWidth="1.5" />
        <circle cx="88" cy="211" r="4.5" fill="#e04444" stroke="#a02020" strokeWidth="1" />
        {/* Sensor eye (orange lens, pointing right) */}
        <ellipse cx="112" cy="252" rx="10" ry="7.5" fill="#f5a423" stroke="#b07010" strokeWidth="1.5" />
        <ellipse cx="112" cy="252" rx="4.5" ry="3.5" fill="#8a5c00" />
        <circle cx="110" cy="250" r="1.5" fill="rgba(255,255,255,0.5)" />

        {/* ══ Kid 1 — tracked (x=590, wave crest y=183) ══ */}
        <circle cx="590" cy="163" r="13" fill="#f5c4a0" stroke="#c09060" strokeWidth="1.8" />
        <circle cx="586" cy="160" r="2" fill="#444" />
        <circle cx="595" cy="160" r="2" fill="#444" />
        {/* Smile */}
        <path d="M 585,166 Q 590,170 596,166" fill="none" stroke="#a06040" strokeWidth="1.2" strokeLinecap="round" />
        {/* Arms waving */}
        <line x1="590" y1="176" x2="572" y2="165" stroke="#c09060" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="590" y1="176" x2="609" y2="163" stroke="#c09060" strokeWidth="2.2" strokeLinecap="round" />
        {/* Upper body (rest below water line) */}
        <line x1="590" y1="176" x2="590" y2="192" stroke="#c09060" strokeWidth="2" />

        {/* ══ Kid 2 (x=420, trough y=227) ══ */}
        <circle cx="420" cy="208" r="12" fill="#f5c4a0" stroke="#c09060" strokeWidth="1.5" />
        <circle cx="417" cy="206" r="1.8" fill="#444" />
        <circle cx="424" cy="206" r="1.8" fill="#444" />
        <line x1="420" y1="220" x2="406" y2="211" stroke="#c09060" strokeWidth="2" strokeLinecap="round" />
        <line x1="420" y1="220" x2="435" y2="211" stroke="#c09060" strokeWidth="2" strokeLinecap="round" />
        <line x1="420" y1="220" x2="420" y2="236" stroke="#c09060" strokeWidth="2" />

        {/* ══ Kid 3 (x=312, y≈205 on zero crossing) ══ */}
        <circle cx="312" cy="190" r="12" fill="#f5c4a0" stroke="#c09060" strokeWidth="1.5" />
        <circle cx="309" cy="188" r="1.8" fill="#444" />
        <circle cx="316" cy="188" r="1.8" fill="#444" />
        <line x1="312" y1="202" x2="298" y2="193" stroke="#c09060" strokeWidth="2" strokeLinecap="round" />
        <line x1="312" y1="202" x2="326" y2="193" stroke="#c09060" strokeWidth="2" strokeLinecap="round" />
        <line x1="312" y1="202" x2="312" y2="217" stroke="#c09060" strokeWidth="2" />

        {/* ══ Labels (labeled version only) ══ */}
        {labeled && (
          <>
            {/* "Lifeguard Robot" label above robot */}
            <rect x="40" y="200" width="96" height="22" rx="4" fill="rgba(255,255,255,0.82)" />
            <text x="88" y="215" textAnchor="middle" fontSize="11" fill="#333" fontWeight="600" fontFamily="inherit">Lifeguard Robot</text>

            {/* "System" label in water */}
            <text x="480" y="370" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.75)" fontFamily="inherit" letterSpacing="1">SYSTEM: local sea level</text>

            {/* Height indicator: vertical arrow from wave baseline (y=205) to kid 1 (y=163) */}
            <line x1="632" y1="205" x2="632" y2="169" stroke="#c84e30" strokeWidth="1.8" markerEnd="url(#sd-arrow-red)" />
            {/* Baseline tick */}
            <line x1="620" y1="205" x2="648" y2="205" stroke="#888" strokeWidth="1" strokeDasharray="4,3" />
            {/* h label */}
            <text x="640" y="190" fontSize="13" fill="#c84e30" fontStyle="italic" fontFamily="inherit" fontWeight="600">h</text>
            <text x="636" y="215" fontSize="9" fill="#888" fontFamily="inherit">baseline</text>

            {/* Velocity indicator: small arrow showing direction of change at crest (horizontal, near-zero rate) */}
            <line x1="600" y1="177" x2="624" y2="169" stroke="#2e9e5a" strokeWidth="1.8" markerEnd="url(#sd-arrow-green)" />
            <text x="628" y="167" fontSize="13" fill="#2e9e5a" fontStyle="italic" fontFamily="inherit" fontWeight="600">v</text>

            {/* Measurement label on cone beam (near midpoint ~350, 207) */}
            <rect x="305" y="192" width="72" height="20" rx="4" fill="rgba(255,255,255,0.82)" />
            <text x="341" y="206" textAnchor="middle" fontSize="10.5" fill="#e08a10" fontWeight="600" fontFamily="inherit">
              {'zₖ (measured)'}
            </text>

            {/* State box near kid 1 */}
            <rect x="615" y="127" width="90" height="26" rx="5" fill="rgba(255,255,255,0.88)" stroke="#c84e30" strokeWidth="1.2" />
            <text x="660" y="144" textAnchor="middle" fontSize="11" fill="#333" fontWeight="600" fontFamily="inherit">State: h, v</text>
            <line x1="615" y1="140" x2="603" y2="163" stroke="#c84e30" strokeWidth="1.2" strokeDasharray="3,2" />

            {/* Dynamic model label near wave trough */}
            <rect x="178" y="244" width="152" height="22" rx="4" fill="rgba(255,255,255,0.82)" />
            <text x="254" y="259" textAnchor="middle" fontSize="11" fill="#1e4d8c" fontWeight="500" fontFamily="inherit">
              {'hₖ = 2·sin(πk/6)'}
            </text>
          </>
        )}
      </svg>

      {caption ? (
        <figcaption className="mt-2 text-xs text-muted font-mono-accent text-center">{caption}</figcaption>
      ) : labeled ? (
        <figcaption className="mt-2 text-xs text-muted font-mono-accent text-center">
          Fig. 1a (labeled): Robot lifeguard monitors sea level h and rate of change v — modeled as h&#x2096; = 2·sin(πk/6) — by measuring the waves every hour. Kalman Gain blends the prediction with measurement z&#x2096;.
        </figcaption>
      ) : (
        <figcaption className="mt-2 text-xs text-muted font-mono-accent text-center">
          Fig. 1b: Beach scenario — a robot lifeguard tracks swimmers by measuring wave height, one ping at a time.
        </figcaption>
      )}
    </figure>
  )
}
