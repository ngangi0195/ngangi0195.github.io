import katex from 'katex'
import { Callout } from '@/components/ui/Callout'
import { Tag } from '@/components/ui/Tag'
import { FlowDiagram } from '@/components/mdx/FlowDiagram'
import { KalmanDiagram } from '@/components/mdx/KalmanDiagram'
import { SituationDiagram } from '@/components/mdx/SituationDiagram'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

function Diagram({ src, alt, caption }: { src?: string; alt?: string; caption?: string }) {
  return (
    <figure className="my-8 text-center">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ''} className="rounded-xl border border-[var(--border)] mx-auto max-w-full" />
      ) : (
        <div className="h-48 rounded-xl border-2 border-dashed border-[var(--border)] flex items-center justify-center bg-[var(--bg-surface-2)]">
          <span className="font-mono-accent text-sm text-muted">[Diagram: {alt}]</span>
        </div>
      )}
      {caption && (
        <figcaption className="mt-2 text-xs text-muted font-mono-accent">{caption}</figcaption>
      )}
    </figure>
  )
}

interface RefItem {
  n: number
  authors: string
  year: string | number
  title: string
  source?: string
  url?: string
}

function Ref({ n }: { n: number }) {
  return (
    <a href={`#ref-${n}`} id={`cite-${n}`} className="ref-inline">
      [{n}]
    </a>
  )
}

function References({ items }: { items: RefItem[] }) {
  const sorted = [...items].sort((a, b) => a.n - b.n)
  return (
    <div className="references-root">
      <p className="references-heading">References</p>
      <ol className="references-list">
        {sorted.map((item) => (
          <li key={item.n} id={`ref-${item.n}`} className="references-item">
            <a href={`#cite-${item.n}`} className="references-n">[{item.n}]</a>
            <span className="references-body">
              <span className="references-authors">{item.authors}</span>
              {' '}
              <span className="references-year">({item.year}).</span>
              {' '}
              {item.url
                ? <a href={item.url} target="_blank" rel="noopener noreferrer" className="references-title">{item.title}</a>
                : <span className="references-title">{item.title}</span>
              }
              {item.source && <span className="references-source">. {item.source}</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

const COLOR_MAP: Record<string, string> = {
  red:    'var(--red)',
  blue:   'var(--blue)',
  yellow: 'var(--yellow)',
  green:  '#22c55e',
  purple: '#a855f7',
  orange: '#f97316',
  teal:   '#14b8a6',
  pink:   '#ec4899',
  muted:  'var(--muted)',
}

function renderDefMath(def: string): string {
  return def.replace(/\$([^$\n]+)\$/g, (_, latex) => {
    try {
      return katex.renderToString(latex.trim(), { throwOnError: false, displayMode: false })
    } catch {
      return latex
    }
  })
}

function Keyword({ children, def }: { children: React.ReactNode; def: string }) {
  const hasMath = def.includes('$')
  return (
    <span className="kw-root">
      {/* tabIndex lets touch/keyboard users open the tooltip via focus */}
      <span className="kw-trigger" tabIndex={0}>{children}</span>
      <span className="kw-tooltip" role="tooltip">
        <span className="kw-arrow" />
        {hasMath
          ? <span dangerouslySetInnerHTML={{ __html: renderDefMath(def) }} />
          : def}
      </span>
    </span>
  )
}

function C({ color = 'red', children }: { color?: string; children: React.ReactNode }) {
  return (
    <span style={{ color: COLOR_MAP[color] ?? color, fontWeight: 600 }}>
      {children}
    </span>
  )
}

function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div className="legend-root">
      {items.map(({ color, label }) => (
        <div key={label} className="legend-item">
          <span className="legend-swatch" style={{ background: COLOR_MAP[color] ?? color }} />
          <span className="legend-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

function CodeComparison({
  before,
  after,
  lang = 'python',
}: {
  before: string
  after: string
  lang?: string
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
      {[
        { label: 'Before', code: before, color: 'text-red-400', border: 'border-2 border-red-500/50' },
        { label: 'After', code: after, color: 'text-green-400', border: 'border-2 border-green-500/50' },
      ].map(({ label, code, color, border }) => (
        <div key={label} className={`rounded-xl border ${border} overflow-hidden`}>
          <div className={`px-4 py-2 text-xs font-mono-accent ${color} bg-[var(--bg-surface-2)] border-b border-[var(--border)]`}>
            {label}
          </div>
          <pre className="p-4 text-sm font-mono-accent text-[var(--text-secondary)] overflow-x-auto bg-[var(--bg-surface)] leading-6">
            <code>{code}</code>
          </pre>
        </div>
      ))}
    </div>
  )
}

export const mdxComponents: MDXComponentsType = {
  Callout,
  Diagram,
  CodeComparison,
  Ref,
  References,
  C,
  Legend,
  Keyword,
  KalmanDiagram,
  SituationDiagram,
  FlowDiagram,
  Tag,
  // Prose overrides
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight text-primary mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children, id }) => (
    <h2 id={id} className="text-2xl font-bold tracking-tight text-primary mt-12 mb-4 scroll-mt-24">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="text-xl font-semibold text-primary mt-8 mb-3 scroll-mt-24">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="leading-8 mb-5 text-secondary">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-400 underline underline-offset-3 hover:text-blue-300 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="my-4 pl-6 space-y-2 text-secondary">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 pl-6 space-y-2 text-secondary list-decimal">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500/60 pl-4 italic my-6 text-secondary">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-[var(--border)]" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left font-mono-accent text-xs uppercase tracking-wider bg-[var(--bg-surface-2)] border border-[var(--border)] text-secondary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border border-[var(--border)] text-secondary">{children}</td>
  ),
  code: ({ children, className }) => {
    if (className) {
      // Block code — handled by rehype-pretty-code
      return <code className={className}>{children}</code>
    }
    return (
      <code className="px-1.5 py-0.5 rounded text-sm font-mono-accent bg-[var(--bg-surface-2)] text-[var(--red)]">
        {children}
      </code>
    )
  },
}
