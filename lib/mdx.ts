import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readingTime: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
      const { data, content } = matter(raw)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        tags: data.tags ?? [],
        readingTime: stats.text,
        content,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    tags: data.tags ?? [],
    readingTime: stats.text,
    content,
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}
