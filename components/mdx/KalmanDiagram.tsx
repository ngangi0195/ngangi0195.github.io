'use client'

export function KalmanDiagram() {
  const W = 760
  const H = 490

  // Box geometry
  const PX = 15,  PY = 80,  PW = 300, PH = 272  // Predict
  const UX = 438, UY = 80,  UW = 307, UH = 272  // Update
  const IX = 15,  IY = 418, IW = 198, IH = 44   // Initial estimate

  const boxBottom = PY + PH          // 352
  const updateCx  = UX + UW / 2     // 591.5
  const initCx    = IX + IW / 2     // 114

  const blue   = 'var(--blue, #5b9cf6)'
  const orange = '#d4841a'
  const red    = '#c84e30'
  const green  = '#2e9e5a'
  const arrow  = 'var(--muted, #888)'
  const border = 'var(--border, #555)'
  const surf   = 'var(--surface, #1c1c1e)'

  const sub = (t: string) => (
    <sub style={{ fontSize: '0.68em' }}>{t}</sub>
  )
  const sup = (t: string) => (
    <sup style={{ fontSize: '0.68em' }}>{t}</sup>
  )
  const xhat = 'x̂'

  return (
    <figure className="my-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        aria-label="Kalman Filter algorithmic loop: Predict and Update steps"
      >
        <defs>
          <marker id="kf-ah" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" style={{ fill: arrow }} />
          </marker>
        </defs>

        {/* ── Predict → Update (arc over the top) ── */}
        <path
          d={`M${PX + PW / 2},${PY} L${PX + PW / 2},36 L${updateCx},36 L${updateCx},${UY}`}
          style={{ fill: 'none', stroke: arrow, strokeWidth: 2 }}
          markerEnd="url(#kf-ah)"
        />

        {/* ── Update → Predict (feedback: dips below, enters Predict bottom right of init box) ── */}
        <path
          d={`M${updateCx},${boxBottom} L${updateCx},460 L255,460 L255,${boxBottom}`}
          style={{ fill: 'none', stroke: arrow, strokeWidth: 2 }}
          markerEnd="url(#kf-ah)"
        />

        {/* ── Initial estimate → Predict ── */}
        <path
          d={`M${initCx},${IY} L${initCx},${boxBottom}`}
          style={{ fill: 'none', stroke: arrow, strokeWidth: 2 }}
          markerEnd="url(#kf-ah)"
        />

        {/* ══ Predict (n, n-1) box ══ */}
        <rect
          x={PX} y={PY} width={PW} height={PH} rx="10"
          style={{ fill: surf, stroke: border, strokeWidth: 1.5 }}
        />
        <foreignObject x={PX} y={PY} width={PW} height={PH}>
          <div style={{ padding: '14px 18px', height: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}>
            <div style={{ textAlign: 'center', color: blue, fontSize: 16, fontStyle: 'italic', fontWeight: 600, marginBottom: 18 }}>
              Predict (n, n−1)
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ color: blue, fontSize: 12, fontWeight: 500, marginBottom: 7 }}>
                1. Extrapolate the state
              </div>
              <div style={{ color: orange, fontSize: 12, fontStyle: 'italic' }}>
                {xhat}{sub('n+1,n')}{' = F'}{xhat}{sub('n,n')}
              </div>
            </div>

            <div>
              <div style={{ color: blue, fontSize: 12, fontWeight: 500, marginBottom: 7 }}>
                2. Extrapolate uncertainty
              </div>
              <div style={{ color: orange, fontSize: 12, fontStyle: 'italic' }}>
                {'P'}{sub('n+1,n')}{' = FP'}{sub('n,n')}{'F'}{sup('T')}{' + Q'}
              </div>
            </div>
          </div>
        </foreignObject>

        {/* ══ Update (n, n) box ══ */}
        <rect
          x={UX} y={UY} width={UW} height={UH} rx="10"
          style={{ fill: surf, stroke: border, strokeWidth: 1.5 }}
        />
        <foreignObject x={UX} y={UY} width={UW} height={UH}>
          <div style={{ padding: '14px 18px', height: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}>
            <div style={{ textAlign: 'center', color: blue, fontSize: 16, fontStyle: 'italic', fontWeight: 600, marginBottom: 18 }}>
              Update (n, n)
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ color: blue, fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
                1. Compute the Kalman Gain
              </div>
              <div style={{ color: red, fontSize: 12, fontStyle: 'italic' }}>
                {'K'}{sub('n')}{' = P'}{sub('n,n−1')}{' / (P'}{sub('n,n−1')}{' + R'}{sub('n')}{')'}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ color: blue, fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
                2. Update estimate with measurement
              </div>
              <div style={{ color: green, fontSize: 11.5, fontStyle: 'italic' }}>
                {xhat}{sub('n,n')}{' = '}{xhat}{sub('n,n−1')}{' + K'}{sub('n')}{'(z'}{sub('n')}{' − '}{xhat}{sub('n,n−1')}{')'}
              </div>
            </div>

            <div>
              <div style={{ color: blue, fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
                3. Update the estimate uncertainty
              </div>
              <div style={{ color: orange, fontSize: 12, fontStyle: 'italic' }}>
                {'P'}{sub('n,n')}{' = (I − K'}{sub('n')}{')P'}{sub('n,n−1')}
              </div>
            </div>
          </div>
        </foreignObject>

        {/* ══ Initial estimate box ══ */}
        <rect
          x={IX} y={IY} width={IW} height={IH} rx="8"
          style={{ fill: surf, stroke: border, strokeWidth: 1.5 }}
        />
        <foreignObject x={IX} y={IY} width={IW} height={IH}>
          <div style={{
            padding: '0 12px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'inherit',
            fontSize: 12,
            fontStyle: 'italic',
            color: 'var(--text2, #aaa)',
          }}>
            {'Initial estimate: '}{xhat}{sub('0,0')}{' P'}{sub('0,0')}
          </div>
        </foreignObject>
      </svg>

      <figcaption className="mt-2 text-xs text-muted font-mono-accent text-center">
        Fig. 2: Recap of the Kalman Filter algorithmic flow across one iteration. <em>Disclaimer: the equations here are simplified — in the full general form, the Kalman Gain and covariance update include an H (measurement matrix) term. Since H = I in this walkthrough, those terms drop out.</em>
      </figcaption>
    </figure>
  )
}
