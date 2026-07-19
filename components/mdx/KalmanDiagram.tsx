'use client'

export function KalmanDiagram() {
  const W = 540

  // Layout constants
  const BOX_X = 60
  const BOX_W = 418
  const BOX_RIGHT = BOX_X + BOX_W // 478
  const INIT_W = 220
  const INIT_X = (W - INIT_W) / 2 // centered
  const BOX_H = 60
  const INIT_H = 38
  const ARROW_H = 20
  const GROUP_GAP = 10

  // Y positions
  const initY  = 10
  const s1Y    = initY + INIT_H + ARROW_H           // 68
  const s2Y    = s1Y + BOX_H + ARROW_H              // 148
  const s3Y    = s2Y + BOX_H + ARROW_H + GROUP_GAP  // 238
  const s4Y    = s3Y + BOX_H + ARROW_H              // 318
  const s5Y    = s4Y + BOX_H + ARROW_H              // 398
  const H      = s5Y + BOX_H + 20                   // 478

  // Group spans
  const predictTop = s1Y
  const predictBot = s2Y + BOX_H  // 208
  const updateTop  = s3Y
  const updateBot  = s5Y + BOX_H  // 458

  // Colors
  const blue   = '#5b9cf6'
  const orange = '#d4841a'
  const red    = '#c84e30'
  const green  = '#2e9e5a'
  const muted  = 'var(--muted, #888)'
  const border = 'var(--border, #444)'
  const surf   = 'var(--surface, #1c1c1e)'

  const xhat = 'x̂'
  const sub = (t: string) => <sub style={{ fontSize: '0.72em' }}>{t}</sub>
  const sup = (t: string) => <sup style={{ fontSize: '0.72em' }}>{t}</sup>

  // Box center x (for vertical arrows)
  const boxCx = BOX_X + BOX_W / 2
  const initBotCx = W / 2

  // Loop arrow geometry
  const loopX   = BOX_RIGHT + 18  // 496
  const loopMidY = (s1Y + BOX_H / 2 + s5Y + BOX_H / 2) / 2

  return (
    <figure className="my-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        aria-label="Kalman Filter vertical process flow: Predict and Update steps"
      >
        <defs>
          <marker id="kf-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--muted, #888)" />
          </marker>
        </defs>

        {/* ── Initial estimate (dashed) ── */}
        <rect
          x={INIT_X} y={initY} width={INIT_W} height={INIT_H} rx="7"
          fill={surf} stroke={border} strokeWidth="1.5" strokeDasharray="4 3"
        />
        <foreignObject x={INIT_X} y={initY} width={INIT_W} height={INIT_H}>
          <div style={{
            height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontStyle: 'italic', fontSize: 12, color: 'var(--text2, #aaa)', fontFamily: 'inherit',
          }}>
            Initial: {xhat}{sub('0,0')}, P{sub('0,0')}
          </div>
        </foreignObject>

        {/* Initial → S1 */}
        <line
          x1={initBotCx} y1={initY + INIT_H}
          x2={initBotCx} y2={s1Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd="url(#kf-arrow)"
        />

        {/* ── PREDICT bracket (left) ── */}
        <line x1={40} y1={predictTop} x2={40} y2={predictBot} stroke={blue} strokeWidth="2.5" />
        <line x1={35} y1={predictTop} x2={45} y2={predictTop} stroke={blue} strokeWidth="1.5" />
        <line x1={35} y1={predictBot} x2={45} y2={predictBot} stroke={blue} strokeWidth="1.5" />
        <text
          x={24} y={(predictTop + predictBot) / 2}
          textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="0.14em" fill={blue}
          transform={`rotate(-90, 24, ${(predictTop + predictBot) / 2})`}
        >
          PREDICT
        </text>

        {/* ── Step 1: Extrapolate state ── */}
        <rect x={BOX_X} y={s1Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <foreignObject x={BOX_X} y={s1Y} width={BOX_W} height={BOX_H}>
          <div style={{ padding: '10px 14px', height: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}>
            <div style={{ color: blue, fontSize: 11.5, fontWeight: 600, marginBottom: 4 }}>
              1. Extrapolate the state
            </div>
            <div style={{ color: blue, fontSize: 12, fontStyle: 'italic' }}>
              {xhat}{sub('n+1,n')}{' = F'}{xhat}{sub('n,n')}
            </div>
          </div>
        </foreignObject>

        {/* S1 → S2 */}
        <line x1={boxCx} y1={s1Y + BOX_H} x2={boxCx} y2={s2Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd="url(#kf-arrow)" />

        {/* ── Step 2: Extrapolate uncertainty ── */}
        <rect x={BOX_X} y={s2Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <foreignObject x={BOX_X} y={s2Y} width={BOX_W} height={BOX_H}>
          <div style={{ padding: '10px 14px', height: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}>
            <div style={{ color: orange, fontSize: 11.5, fontWeight: 600, marginBottom: 4 }}>
              2. Extrapolate uncertainty
            </div>
            <div style={{ color: orange, fontSize: 12, fontStyle: 'italic' }}>
              {'P'}{sub('n+1,n')}{' = FP'}{sub('n,n')}{'F'}{sup('T')}{' + Q'}
            </div>
          </div>
        </foreignObject>

        {/* S2 → S3 (cross-group arrow) */}
        <line x1={boxCx} y1={s2Y + BOX_H} x2={boxCx} y2={s3Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd="url(#kf-arrow)" />

        {/* ── UPDATE bracket (left) ── */}
        <line x1={40} y1={updateTop} x2={40} y2={updateBot} stroke={red} strokeWidth="2.5" />
        <line x1={35} y1={updateTop} x2={45} y2={updateTop} stroke={red} strokeWidth="1.5" />
        <line x1={35} y1={updateBot} x2={45} y2={updateBot} stroke={red} strokeWidth="1.5" />
        <text
          x={24} y={(updateTop + updateBot) / 2}
          textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="0.14em" fill={red}
          transform={`rotate(-90, 24, ${(updateTop + updateBot) / 2})`}
        >
          UPDATE
        </text>

        {/* ── Step 3: Kalman Gain ── */}
        <rect x={BOX_X} y={s3Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <foreignObject x={BOX_X} y={s3Y} width={BOX_W} height={BOX_H}>
          <div style={{ padding: '10px 14px', height: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}>
            <div style={{ color: red, fontSize: 11.5, fontWeight: 600, marginBottom: 4 }}>
              3. Compute Kalman Gain
            </div>
            <div style={{ color: red, fontSize: 12, fontStyle: 'italic' }}>
              {'K'}{sub('n')}{' = P'}{sub('n,n−1')}{' / (P'}{sub('n,n−1')}{' + R'}{sub('n')}{')'}
            </div>
          </div>
        </foreignObject>

        {/* S3 → S4 */}
        <line x1={boxCx} y1={s3Y + BOX_H} x2={boxCx} y2={s4Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd="url(#kf-arrow)" />

        {/* ── Step 4: Update state estimate ── */}
        <rect x={BOX_X} y={s4Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <foreignObject x={BOX_X} y={s4Y} width={BOX_W} height={BOX_H}>
          <div style={{ padding: '10px 14px', height: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}>
            <div style={{ color: green, fontSize: 11.5, fontWeight: 600, marginBottom: 4 }}>
              4. Update state estimate
            </div>
            <div style={{ color: green, fontSize: 12, fontStyle: 'italic' }}>
              {xhat}{sub('n,n')}{' = '}{xhat}{sub('n,n−1')}{' + K'}{sub('n')}{'(z'}{sub('n')}{' − '}{xhat}{sub('n,n−1')}{')'}
            </div>
          </div>
        </foreignObject>

        {/* S4 → S5 */}
        <line x1={boxCx} y1={s4Y + BOX_H} x2={boxCx} y2={s5Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd="url(#kf-arrow)" />

        {/* ── Step 5: Update uncertainty ── */}
        <rect x={BOX_X} y={s5Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <foreignObject x={BOX_X} y={s5Y} width={BOX_W} height={BOX_H}>
          <div style={{ padding: '10px 14px', height: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}>
            <div style={{ color: orange, fontSize: 11.5, fontWeight: 600, marginBottom: 4 }}>
              5. Update estimate uncertainty
            </div>
            <div style={{ color: orange, fontSize: 12, fontStyle: 'italic' }}>
              {'P'}{sub('n,n')}{' = (I − K'}{sub('n')}{')P'}{sub('n,n−1')}
            </div>
          </div>
        </foreignObject>

        {/* ── Loop arrow: right side, S5 → S1 ── */}
        <path
          d={`M ${BOX_RIGHT} ${s5Y + BOX_H / 2} L ${loopX} ${s5Y + BOX_H / 2} L ${loopX} ${s1Y + BOX_H / 2} L ${BOX_RIGHT + 2} ${s1Y + BOX_H / 2}`}
          fill="none" stroke={muted} strokeWidth="1.5" markerEnd="url(#kf-arrow)"
        />
        <text
          x={loopX + 5} y={loopMidY}
          textAnchor="middle" fontSize="8.5" fill={muted} letterSpacing="0.04em"
          transform={`rotate(90, ${loopX + 5}, ${loopMidY})`}
        >
          next iteration
        </text>
      </svg>

      <figcaption className="mt-2 text-xs text-muted font-mono-accent text-center">
        Fig. 2: Kalman Filter algorithmic flow — each iteration Predicts the next state, then Updates using the measurement. <em>Equations simplified (H = I throughout this walkthrough).</em>
      </figcaption>
    </figure>
  )
}
