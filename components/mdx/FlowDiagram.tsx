'use client'

const NW = 138    // node width
const NH = 50     // node height
const CG = 68     // col gap
const RG = 64     // row gap
const PAD = 32    // outer padding

interface DiagramNode {
  id: string
  label: string
  tag?: string
  row: number
  col: number
}

interface DiagramEdge {
  from: string
  to: string
  label?: string
}

interface FlowDiagramProps {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

function ncx(n: DiagramNode) { return PAD + n.col * (NW + CG) + NW / 2 }
function ncy(n: DiagramNode) { return PAD + n.row * (NH + RG) + NH / 2 }

function getPath(from: DiagramNode, to: DiagramNode, maxRow: number): string {
  const [sx0, sy0] = [ncx(from), ncy(from)]
  const [tx0, ty0] = [ncx(to), ncy(to)]

  const right  = to.col > from.col
  const left   = to.col < from.col
  const down   = to.row > from.row
  const up     = to.row < from.row
  const sameR  = from.row === to.row
  const sameC  = from.col === to.col

  if (right && sameR) {
    // straight right
    const [sx, tx] = [sx0 + NW / 2, tx0 - NW / 2]
    const mx = (sx + tx) / 2
    return `M${sx},${sy0} C${mx},${sy0} ${mx},${ty0} ${tx},${ty0}`
  }

  if (left && sameR) {
    // feedback — route below all rows
    const [sx, tx] = [sx0, tx0]
    const [sy, ty] = [sy0 + NH / 2, ty0 + NH / 2]
    const by = PAD + (maxRow + 1) * (NH + RG) - RG / 2 + 20
    return `M${sx},${sy} C${sx},${by} ${tx},${by} ${tx},${ty}`
  }

  if (sameC && down) {
    // straight down
    const [sy, ty] = [sy0 + NH / 2, ty0 - NH / 2]
    const my = (sy + ty) / 2
    return `M${sx0},${sy} C${sx0},${my} ${tx0},${my} ${tx0},${ty}`
  }

  if (sameC && up) {
    // straight up
    const [sy, ty] = [sy0 - NH / 2, ty0 + NH / 2]
    const my = (sy + ty) / 2
    return `M${sx0},${sy} C${sx0},${my} ${tx0},${my} ${tx0},${ty}`
  }

  if (down && right) {
    // exit right → enter top
    const sx = sx0 + NW / 2
    const ty = ty0 - NH / 2
    return `M${sx},${sy0} C${tx0},${sy0} ${tx0},${sy0} ${tx0},${ty}`
  }

  if (down && left) {
    // exit bottom → enter right
    const sy = sy0 + NH / 2
    const tx = tx0 + NW / 2
    return `M${sx0},${sy} C${sx0},${ty0} ${sx0},${ty0} ${tx},${ty0}`
  }

  if (up && right) {
    // exit right → enter bottom
    const sx = sx0 + NW / 2
    const ty = ty0 + NH / 2
    return `M${sx},${sy0} C${tx0},${sy0} ${tx0},${sy0} ${tx0},${ty}`
  }

  if (up && left) {
    // route above all rows
    const [sy, ty] = [sy0 - NH / 2, ty0 - NH / 2]
    const topY = PAD - 28
    return `M${sx0},${sy} C${sx0},${topY} ${tx0},${topY} ${tx0},${ty}`
  }

  return ''
}

function bezierMid(d: string) {
  const nums = d.match(/[-\d.]+/g)?.map(Number) ?? []
  if (nums.length < 8) return { x: 0, y: 0 }
  const [x0, y0, cx1, cy1, cx2, cy2, x1, y1] = nums
  const b = (a: number, b: number, c: number, dd: number) =>
    a * 0.125 + b * 0.375 + c * 0.375 + dd * 0.125
  return { x: b(x0, cx1, cx2, x1), y: b(y0, cy1, cy2, y1) }
}

export function FlowDiagram({ nodes, edges }: FlowDiagramProps) {
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))
  const maxRow = Math.max(...nodes.map(n => n.row))
  const maxCol = Math.max(...nodes.map(n => n.col))

  const svgW = PAD * 2 + (maxCol + 1) * NW + maxCol * CG
  const svgH = PAD * 2 + (maxRow + 1) * NH + maxRow * RG + (edges.some(e => {
    const f = nodeMap[e.from], t = nodeMap[e.to]
    return f && t && t.col < f.col && t.row === f.row
  }) ? 52 : 0)

  const markerId = 'fd-arrow'

  return (
    <div className="flowdiagram-root">
      <svg
        width="100%"
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <marker
            id={markerId}
            markerWidth="8" markerHeight="6"
            refX="7" refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" className="fd-arrowhead" />
          </marker>
        </defs>

        {/* edges */}
        {edges.map((edge, i) => {
          const from = nodeMap[edge.from]
          const to   = nodeMap[edge.to]
          if (!from || !to) return null
          const d = getPath(from, to, maxRow)
          if (!d) return null
          const mid = edge.label ? bezierMid(d) : null
          return (
            <g key={i}>
              <path
                d={d}
                className="fd-edge"
                markerEnd={`url(#${markerId})`}
              />
              {mid && edge.label && (
                <text
                  x={mid.x} y={mid.y - 6}
                  className="fd-edge-label"
                  textAnchor="middle"
                >
                  {edge.label}
                </text>
              )}
            </g>
          )
        })}

        {/* nodes as foreignObject so we can use CSS */}
        {nodes.map(node => {
          const x = PAD + node.col * (NW + CG)
          const y = PAD + node.row * (NH + RG)
          return (
            <foreignObject key={node.id} x={x} y={y} width={NW} height={NH}>
              <div className="fd-node">
                {node.tag && <span className="fd-tag">{node.tag}</span>}
                <span className="fd-label">{node.label}</span>
              </div>
            </foreignObject>
          )
        })}
      </svg>
    </div>
  )
}
