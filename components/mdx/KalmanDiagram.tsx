'use client'

export function KalmanDiagram() {
  const W = 400

  // Box geometry
  const BOX_X = 54
  const BOX_W = 302
  const BOX_RIGHT = BOX_X + BOX_W   // 356
  const BOX_H = 76
  const INIT_W = 188
  const INIT_H = 42
  const INIT_X = BOX_X + (BOX_W - INIT_W) / 2  // centered on box column
  const ARROW_H = 18
  const GROUP_GAP = 10

  // Y positions
  const initY = 10
  const s1Y = initY + INIT_H + ARROW_H    // 70
  const s2Y = s1Y + BOX_H + ARROW_H       // 164
  const s3Y = s2Y + BOX_H + ARROW_H + GROUP_GAP  // 268
  const s4Y = s3Y + BOX_H + ARROW_H       // 362
  const s5Y = s4Y + BOX_H + ARROW_H       // 456
  const H   = s5Y + BOX_H + 20            // 552

  // Group bracket spans
  const predictTop = s1Y
  const predictBot = s2Y + BOX_H   // 240
  const updateTop  = s3Y
  const updateBot  = s5Y + BOX_H   // 532

  const boxCx  = BOX_X + BOX_W / 2   // 205 — vertical arrow x
  const loopX  = BOX_RIGHT + 17      // 373 — right-side loop arrow x
  const loopMidY = (s1Y + BOX_H / 2 + s5Y + BOX_H / 2) / 2

  // Colors
  const blue   = '#5b9cf6'
  const orange = '#d4841a'
  const red    = '#c84e30'
  const green  = '#2e9e5a'
  const muted  = 'var(--muted, #888)'
  const border = 'var(--border, #444)'
  const surf   = 'var(--surface, #1c1c1e)'
  const text2  = 'var(--text2, #aaa)'

  const X = 'x̂'
  const am = 'url(#kf-a)'

  // Sub/superscript helpers — pure SVG tspan, scales with viewBox
  const sub = (t: string) => (
    <tspan baselineShift="sub" fontSize="8.5">{t}</tspan>
  )
  const sup = (t: string) => (
    <tspan baselineShift="super" fontSize="8.5">{t}</tspan>
  )

  // Y-offsets within a step box
  const LBL = 24   // label baseline
  const FML = 50   // formula baseline

  return (
    <figure className="my-8" style={{ maxWidth: 560, margin: '2rem auto 1rem' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        aria-label="Kalman Filter algorithmic flow: Predict and Update steps"
      >
        <defs>
          <marker id="kf-a" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0,7 2.5,0 5" fill="var(--muted, #888)" />
          </marker>
        </defs>

        {/* ── Initial estimate (dashed) ── */}
        <rect x={INIT_X} y={initY} width={INIT_W} height={INIT_H} rx="7"
          fill={surf} stroke={border} strokeWidth="1.5" strokeDasharray="4 3" />
        <text
          x={INIT_X + INIT_W / 2} y={initY + INIT_H / 2}
          textAnchor="middle" dominantBaseline="central"
          fontSize="12" fontStyle="italic" fill={text2}
        >
          Initial: {X}{sub('0,0')}, P{sub('0,0')}
        </text>

        {/* ── Down arrows ── */}
        <line x1={boxCx} y1={initY + INIT_H} x2={boxCx} y2={s1Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd={am} />
        <line x1={boxCx} y1={s1Y + BOX_H} x2={boxCx} y2={s2Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd={am} />
        <line x1={boxCx} y1={s2Y + BOX_H} x2={boxCx} y2={s3Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd={am} />
        <line x1={boxCx} y1={s3Y + BOX_H} x2={boxCx} y2={s4Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd={am} />
        <line x1={boxCx} y1={s4Y + BOX_H} x2={boxCx} y2={s5Y - 2}
          stroke={muted} strokeWidth="1.5" markerEnd={am} />

        {/* ── PREDICT bracket ── */}
        <line x1={36} y1={predictTop} x2={36} y2={predictBot} stroke={blue} strokeWidth="2.5" />
        <line x1={31} y1={predictTop} x2={41} y2={predictTop} stroke={blue} strokeWidth="1.5" />
        <line x1={31} y1={predictBot} x2={41} y2={predictBot} stroke={blue} strokeWidth="1.5" />
        <text
          x={18} y={(predictTop + predictBot) / 2}
          textAnchor="middle" dominantBaseline="central"
          fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={blue}
          transform={`rotate(-90, 18, ${(predictTop + predictBot) / 2})`}
        >PREDICT</text>

        {/* ── Step 1: Extrapolate state ── */}
        <rect x={BOX_X} y={s1Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <text x={BOX_X + 14} y={s1Y + LBL} fontSize="13" fontWeight="600" fill={blue}>
          1. Extrapolate the state
        </text>
        <text x={BOX_X + 14} y={s1Y + FML} fontSize="13" fontStyle="italic" fill={blue}>
          {X}{sub('n+1,n')} = F{X}{sub('n,n')}
        </text>

        {/* ── Step 2: Extrapolate uncertainty ── */}
        <rect x={BOX_X} y={s2Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <text x={BOX_X + 14} y={s2Y + LBL} fontSize="13" fontWeight="600" fill={orange}>
          2. Extrapolate uncertainty
        </text>
        <text x={BOX_X + 14} y={s2Y + FML} fontSize="13" fontStyle="italic" fill={orange}>
          P{sub('n+1,n')} = FP{sub('n,n')}F{sup('T')} + Q
        </text>

        {/* ── UPDATE bracket ── */}
        <line x1={36} y1={updateTop} x2={36} y2={updateBot} stroke={red} strokeWidth="2.5" />
        <line x1={31} y1={updateTop} x2={41} y2={updateTop} stroke={red} strokeWidth="1.5" />
        <line x1={31} y1={updateBot} x2={41} y2={updateBot} stroke={red} strokeWidth="1.5" />
        <text
          x={18} y={(updateTop + updateBot) / 2}
          textAnchor="middle" dominantBaseline="central"
          fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={red}
          transform={`rotate(-90, 18, ${(updateTop + updateBot) / 2})`}
        >UPDATE</text>

        {/* ── Step 3: Kalman Gain ── */}
        <rect x={BOX_X} y={s3Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <text x={BOX_X + 14} y={s3Y + LBL} fontSize="13" fontWeight="600" fill={red}>
          3. Compute Kalman Gain
        </text>
        <text x={BOX_X + 14} y={s3Y + FML} fontSize="13" fontStyle="italic" fill={red}>
          K{sub('n')} = P{sub('n,n−1')} / (P{sub('n,n−1')} + R{sub('n')})
        </text>

        {/* ── Step 4: Update state estimate ── */}
        <rect x={BOX_X} y={s4Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <text x={BOX_X + 14} y={s4Y + LBL} fontSize="13" fontWeight="600" fill={green}>
          4. Update state estimate
        </text>
        <text x={BOX_X + 14} y={s4Y + FML} fontSize="13" fontStyle="italic" fill={green}>
          {X}{sub('n,n')} = {X}{sub('n,n−1')} + K{sub('n')}(z{sub('n')} − {X}{sub('n,n−1')})
        </text>

        {/* ── Step 5: Update estimate uncertainty ── */}
        <rect x={BOX_X} y={s5Y} width={BOX_W} height={BOX_H} rx="8"
          fill={surf} stroke={border} strokeWidth="1.5" />
        <text x={BOX_X + 14} y={s5Y + LBL} fontSize="13" fontWeight="600" fill={orange}>
          5. Update estimate uncertainty
        </text>
        <text x={BOX_X + 14} y={s5Y + FML} fontSize="13" fontStyle="italic" fill={orange}>
          P{sub('n,n')} = (I − K{sub('n')})P{sub('n,n−1')}
        </text>

        {/* ── Loop arrow: right side, S5 → S1 ── */}
        <path
          d={`M ${BOX_RIGHT} ${s5Y + BOX_H / 2} H ${loopX} V ${s1Y + BOX_H / 2} H ${BOX_RIGHT + 2}`}
          fill="none" stroke={muted} strokeWidth="1.5" markerEnd={am}
        />
        <text
          x={loopX + 5} y={loopMidY}
          textAnchor="middle" dominantBaseline="central"
          fontSize="8.5" fill={muted} letterSpacing="0.04em"
          transform={`rotate(90, ${loopX + 5}, ${loopMidY})`}
        >next iteration</text>
      </svg>

      <figcaption className="mt-2 text-xs text-muted font-mono-accent text-center">
        Fig. 2: Kalman Filter algorithmic flow — each iteration Predicts the next state, then Updates using the measurement. <em>Equations simplified (H = I throughout this walkthrough).</em>
      </figcaption>
    </figure>
  )
}
