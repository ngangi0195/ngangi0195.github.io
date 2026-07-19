import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

// In-memory cache so the dev server doesn't recompile unchanged posts on every request.
// Keyed by the raw source string; cleared automatically when the process restarts.
const cache = new Map<string, MDXContent>()
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { visit } from 'unist-util-visit'
import type { MDXContent } from 'mdx/types'
import type { Root, Element } from 'hast'

function rehypeTrimCodeLeadingNewline() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'code' &&
        node.children[0]?.type === 'text' &&
        (node.children[0].value as string).startsWith('\n')
      ) {
        node.children[0].value = (node.children[0].value as string).replace(/^\n/, '')
      }
    })
  }
}

export async function compileMDX(source: string): Promise<MDXContent> {
  if (cache.has(source)) return cache.get(source)!

  const compiled = await compile(source, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeTrimCodeLeadingNewline,
      [
        rehypePrettyCode,
        {
          theme: { dark: 'github-dark-dimmed', light: 'github-light' },
          keepBackground: false,
        },
      ],
    ],
  })

  const { default: Content } = await run(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
  })

  cache.set(source, Content)
  return Content
}
