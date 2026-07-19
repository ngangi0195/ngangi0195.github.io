/**
 * Export a blog post to Substack-ready HTML.
 *
 * Usage:
 *   node scripts/to-substack.mjs <slug>
 *   node scripts/to-substack.mjs understanding-kalman-filters
 *
 * Output: scripts/out/<slug>-substack.html
 *
 * What it does:
 *   • Strips MDX frontmatter
 *   • Converts custom components to plain equivalents
 *   • Renders math via KaTeX
 *   • Produces a self-contained HTML file you can paste or import into Substack
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import katex from 'katex'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import { toHtml } from 'hast-util-to-html'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BLOG_DIR = path.join(ROOT, 'content', 'blog')
const OUT_DIR = path.join(__dirname, 'out')

// ─── Component transformers ───────────────────────────────────────────────────

const CALLOUT_LABEL = { info: 'Note', warning: 'Warning', tip: 'Tip', danger: 'Caution' }

function transformCallouts(src) {
  // <Callout type="info" title="Prerequisites">...</Callout>
  // Attributes may appear in either order.
  return src.replace(
    /<Callout\s([^>]*)>([\s\S]*?)<\/Callout>/g,
    (_, attrs, body) => {
      const type  = attrs.match(/type="([^"]+)"/)?.[1]  ?? 'info'
      const title = attrs.match(/title="([^"]+)"/)?.[1] ?? ''
      const label = CALLOUT_LABEL[type] ?? 'Note'
      const lines = body.trim().split('\n').map(l => `> ${l}`).join('\n')
      const heading = title ? `${label}: ${title}` : label
      return `> **${heading}**\n>\n${lines}\n`
    }
  )
}

function transformKeywords(src) {
  // <Keyword def="...">term</Keyword>
  // First occurrence → <u>term</u> (underlined, links to glossary anchor).
  // Subsequent occurrences → plain term.
  // All unique terms collected into a ## Glossary section at the end.
  const seen = new Map() // lowercase term → { term, def }

  const body = src.replace(
    /<Keyword\s+def="([\s\S]*?)">([\s\S]*?)<\/Keyword>/g,
    (_, def, term) => {
      const key = term.trim().toLowerCase().replace(/["""''.,!?;:"]/g, '').trim()
      if (!seen.has(key)) {
        seen.set(key, { term: term.trim(), def: def.trim() })
        return `<u>${term.trim()}</u>`
      }
      return term.trim()
    }
  )

  if (seen.size === 0) return body

  const glossaryLines = ['\n\n---\n\n## Glossary\n']
  const sorted = [...seen.values()].sort((a, b) => a.term.localeCompare(b.term))
  for (const { term, def } of sorted) {
    glossaryLines.push(`**${term}**: ${def}\n`)
  }

  return body + glossaryLines.join('\n')
}

function transformColors(src) {
  // <C color="blue">text</C>  →  **text**
  return src.replace(/<C(?:\s+color="[^"]*")?>([^<]+)<\/C>/g, (_, text) => `**${text}**`)
}

function transformRefs(src) {
  // <Ref n={3} />  →  [3]
  return src.replace(/<Ref\s+n=\{(\d+)\}\s*\/>/g, (_, n) => `[${n}]`)
}

function transformDiagrams(src) {
  // <Diagram src="/..." alt="..." caption="..." />
  // <Diagram alt="..." caption="..." />  (no src = placeholder)
  return src.replace(/<Diagram\s([^/]*?)\/>/gs, (_, attrs) => {
    const src     = attrs.match(/src="([^"]+)"/)?.[1]
    const alt     = attrs.match(/alt="([^"]+)"/)?.[1]     ?? 'Diagram'
    const caption = attrs.match(/caption="([^"]+)"/)?.[1] ?? ''
    if (src) {
      const base = src.startsWith('/') ? 'https://nidhingangisetty.com' : ''
      return `![${alt}](${base}${src})\n${caption ? `*${caption}*` : ''}\n`
    }
    return `> *[Diagram: ${alt}${caption ? ` — ${caption}` : ''}]*\n> *(See original post for the full visual.)*\n`
  })
}

function transformCodeComparison(src) {
  // <CodeComparison
  //   before={`...`}
  //   after={`...`}
  //   lang="python"
  // />
  return src.replace(
    /<CodeComparison[\s\S]*?before=\{`([\s\S]*?)`\}[\s\S]*?after=\{`([\s\S]*?)`\}[\s\S]*?(?:lang="([^"]*)")?[\s\S]*?\/>/g,
    (_, before, after, lang) => {
      lang = lang ?? 'text'
      return (
        `**Before:**\n\`\`\`${lang}\n${before.trim()}\n\`\`\`` +
        `\n\n**After:**\n\`\`\`${lang}\n${after.trim()}\n\`\`\``
      )
    }
  )
}

function transformLegend(src) {
  // <Legend items={[{ color: 'blue', label: 'Robot Pose' }, ...]} />
  return src.replace(/<Legend\s+items=\{\[([\s\S]*?)\]\}\s*\/>/g, (_, inner) => {
    const items = [...inner.matchAll(/\{\s*color:\s*'([^']+)',\s*label:\s*'([^']+)'\s*\}/g)]
    if (!items.length) return ''
    return items.map(([, color, label]) => `- **${label}** *(${color})*`).join('\n')
  })
}

function transformReferences(src) {
  // <References items={[{ n: 1, authors: '...', year: '...', title: '...', url: '...' }, ...]} />
  // Handles both single and double quoted string values.
  return src.replace(/<References\s+items=\{\[([\s\S]*?)\]\}\s*\/>/g, (_, inner) => {
    const q = `(?:'([^']*)'|"([^"]*)")`  // captures either 'x' or "x"
    const val = (m) => m?.[1] ?? m?.[2]  // whichever capture group matched

    const objects = inner.split(/\},\s*\{/).map((o, i, arr) => {
      if (i === 0) o = o.replace(/^\s*\{/, '')
      if (i === arr.length - 1) o = o.replace(/\}\s*$/, '')
      return o
    })

    const lines = ['**References**', '']
    for (const obj of objects) {
      const n       = obj.match(/\bn:\s*(\d+)/)?.[1]
      const authors = val(obj.match(new RegExp(`authors:\\s*${q}`)))
      const year    = val(obj.match(new RegExp(`year:\\s*${q}`)))
      const title   = val(obj.match(new RegExp(`title:\\s*${q}`)))
      const url     = val(obj.match(new RegExp(`url:\\s*${q}`)))
      if (!n) continue
      const titleStr = url ? `[${title}](${url})` : title
      lines.push(`${n}. ${authors} (${year}). ${titleStr}`)
    }
    return lines.join('\n')
  })
}

function stubDiagramComponents(src) {
  // <KalmanDiagram />, <SituationDiagram labeled />, <FlowDiagram ... />, etc.
  const names = ['KalmanDiagram', 'SituationDiagram', 'FlowDiagram']
  for (const name of names) {
    src = src.replace(
      new RegExp(`<${name}[^/]*/>`, 'g'),
      `> *[Interactive diagram — see the original post at nidhingangisetty.com/blog for the full visual.]*\n`
    )
  }
  return src
}

function transformMath(src) {
  // Convert markdown-escaped dollars (\$) to HTML entity first — they're
  // literal dollars in the text, not math delimiters.
  src = src.replace(/\\\$/g, '&#36;')
  // Also catch any remaining unescaped currency dollars (space + $ + digit).
  src = src.replace(/([\s"'(,>])\$(\d)/g, (_, pre, digit) => `${pre}&#36;${digit}`)

  // Display math ($$...$$) — render for preview, expose raw LaTeX to copy into Substack's /equation
  src = src.replace(/\$\$([\s\S]*?)\$\$/g, (_, latex) => {
    const trimmed = latex.trim()
    let rendered
    try {
      rendered = katex.renderToString(trimmed, { displayMode: true, throwOnError: false })
    } catch {
      rendered = `<pre>${trimmed}</pre>`
    }
    const escaped = trimmed.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return (
      `<div class="math-block">` +
        `<div class="math-preview">${rendered}</div>` +
        `<div class="math-source">` +
          `<span class="math-source-label">Substack: type /equation and paste this LaTeX</span>` +
          `<pre class="math-latex">${escaped}</pre>` +
        `</div>` +
      `</div>`
    )
  })

  // Inline math ($...$) — render visually; Substack can't paste these, so add a subtle indicator
  src = src.replace(/\$([^$\n]+)\$/g, (_, latex) => {
    try {
      return katex.renderToString(latex.trim(), { displayMode: false, throwOnError: false })
    } catch {
      return `<code>${latex}</code>`
    }
  })

  return src
}

function stripRemainingJSX(src) {
  // Remove any leftover self-closing or block JSX tags that weren't handled above.
  // Catch-all so the markdown pipeline doesn't choke on unknown tags.
  src = src.replace(/^<[A-Z][A-Za-z]*[^>]*\/>\s*$/gm, '')
  src = src.replace(/^<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>\s*$/gm, '')
  return src
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const slug = process.argv[2]
  if (!slug) {
    console.error('Usage: node scripts/to-substack.mjs <slug>')
    console.error('Available posts:')
    fs.readdirSync(BLOG_DIR)
      .filter(f => f.endsWith('.mdx'))
      .forEach(f => console.error(' ', f.replace('.mdx', '')))
    process.exit(1)
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    console.error(`Post not found: ${filePath}`)
    process.exit(1)
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content: mdxContent } = matter(raw)

  if (frontmatter.draft) {
    console.warn('Warning: This post is marked draft: true — exporting anyway.')
  }

  // Apply transformations in dependency order
  let md = mdxContent
  md = transformCallouts(md)
  md = transformKeywords(md)
  md = transformColors(md)
  md = transformRefs(md)
  md = transformDiagrams(md)
  md = transformCodeComparison(md)
  md = transformLegend(md)
  md = transformReferences(md)
  md = stubDiagramComponents(md)
  md = stripRemainingJSX(md)
  md = transformMath(md)

  // Prepend title + metadata as a clean header
  const header = [
    `# ${frontmatter.title ?? slug}`,
    '',
    frontmatter.excerpt ? `*${frontmatter.excerpt}*` : '',
    '',
  ].join('\n')

  md = header + md

  // Remark → Rehype → HTML (math already transformed above as raw HTML)
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })

  const hast = await processor.run(processor.parse(md))
  const body = toHtml(hast, { allowDangerousHtml: true })

  const tags = (frontmatter.tags ?? []).join(', ')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${frontmatter.title ?? slug}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous" />
  <style>
    body { max-width: 720px; margin: 40px auto; font-family: Georgia, serif; font-size: 18px; line-height: 1.7; color: #1a1a1a; padding: 0 20px; }
    h1 { font-size: 2em; line-height: 1.2; }
    h2 { font-size: 1.4em; margin-top: 2em; }
    h3 { font-size: 1.15em; margin-top: 1.5em; }
    pre { background: #f5f5f5; padding: 16px; border-radius: 6px; overflow-x: auto; font-size: 0.85em; }
    code { font-family: 'JetBrains Mono', monospace; }
    p code { background: #f0f0f0; padding: 2px 5px; border-radius: 3px; font-size: 0.9em; }
    blockquote { border-left: 3px solid #ccc; margin: 1.5em 0; padding: 0.5em 1em; color: #555; }
    img { max-width: 100%; border-radius: 6px; }
    /* Math blocks */
    .math-block { margin: 1.5em 0; }
    .math-preview { overflow-x: auto; padding: 0.5em 0; }
    .math-source { margin-top: 0.5em; background: #fffbea; border: 1px solid #f0d060; border-radius: 6px; padding: 10px 14px; }
    .math-source-label { font-family: sans-serif; font-size: 0.72em; color: #a07000; display: block; margin-bottom: 6px; font-weight: 600; letter-spacing: 0.02em; }
    .math-latex { margin: 0; background: none; border: none; padding: 0; font-size: 0.82em; color: #333; white-space: pre-wrap; word-break: break-all; }
    /* Substack export metadata */
    .substack-meta { font-size: 0.8em; color: #888; font-family: sans-serif; margin-bottom: 2em; border-bottom: 1px solid #eee; padding-bottom: 1em; }
  </style>
</head>
<body>
  <div class="substack-meta">
    Exported for Substack from <strong>nidhingangisetty.com/blog/${slug}</strong>${tags ? ` · Tags: ${tags}` : ''}
  </div>
  ${body}
</body>
</html>`

  fs.mkdirSync(OUT_DIR, { recursive: true })
  const outPath = path.join(OUT_DIR, `${slug}-substack.html`)
  fs.writeFileSync(outPath, html, 'utf8')

  console.log(`✅  Exported to: ${outPath}`)
  console.log()
  console.log('To import into Substack:')
  console.log('  1. Open the HTML file in a browser, select all (⌘A), copy (⌘C)')
  console.log('  2. In Substack, create a new post and paste (⌘V)')
  console.log('  3. Headings, lists, blockquotes, and code blocks transfer cleanly')
  console.log('  4. For each equation: type /equation in Substack, paste the LaTeX')
  console.log('     from the yellow box shown below each formula in the HTML file')
  console.log('  5. Review any diagram placeholders and add images manually')
}

main().catch(err => { console.error(err); process.exit(1) })
