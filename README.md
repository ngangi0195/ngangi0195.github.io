# Portfolio

Personal portfolio for a robotics & software engineering student. Built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
```

---

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # / — Main portfolio
│   ├── blog/
│   │   ├── page.tsx          # /blog — Blog index
│   │   └── [slug]/page.tsx   # /blog/[slug] — Blog post
│   └── content/page.tsx      # /content — Content page
├── components/
│   ├── home/                 # Hero, Experience, About, Projects, Activities
│   ├── blog/                 # BlogCard, BlogSearch, TableOfContents
│   ├── layout/               # Navbar, Footer
│   ├── mdx/                  # MDXComponents (Callout, Diagram, CodeComparison)
│   └── ui/                   # Tag, Card, Section, Timeline, ThemeToggle, Callout
├── content/
│   └── blog/                 # MDX blog posts go here
├── data/
│   ├── experience.ts
│   ├── projects.ts
│   ├── activities.ts
│   └── content.ts
└── lib/
    ├── mdx.ts                # Blog post parsing
    └── utils.ts              # cn(), formatDate()
```

---

## Adding a Blog Post

1. Create a new `.mdx` file in `/content/blog/`:

```mdx
---
title: "My Post Title"
date: "2024-04-01"
excerpt: "A short description shown on the blog index card."
tags: ["ROS2", "SLAM", "Tutorial"]
---

Your content here. Supports full Markdown, math via KaTeX, and custom MDX components.
```

2. It automatically appears on `/blog` sorted by date.

### Supported MDX Components

```mdx
<Callout type="info" title="Note">Some info</Callout>
<Callout type="warning">Be careful</Callout>
<Callout type="tip">Pro tip</Callout>
<Callout type="danger">Watch out</Callout>

<Diagram alt="Description" caption="Figure caption" />

<CodeComparison
  before={`old_code()`}
  after={`new_code()`}
  lang="python"
/>
```

Math (KaTeX): use `$inline$` and `$$block$$` syntax.

Code blocks with syntax highlighting via Shiki:

````mdx
```python title="example.py"
def hello():
    return "world"
```
````

---

## Updating Content

All content is driven from TypeScript files in `/data/` — no code changes needed for updates.

| File | What it controls |
|------|-----------------|
| `data/experience.ts` | Experience timeline entries |
| `data/projects.ts` | Project cards on the home page |
| `data/activities.ts` | Activities cards on the home page |
| `data/content.ts` | Content page (books, papers, videos, etc.) |

Each file exports a typed array — just add/edit/remove entries and the UI updates automatically.

---

## Updating Personal Info

Search for these placeholders and replace with your real info:

- `Your Name` — your name (Navbar logo, Hero, metadata)
- `you@example.com` — your email (Footer)
- `yourhandle` — your Twitter/X handle (metadata)
- `https://yoursite.com` — your deployed URL (metadata)
- `https://github.com` — your GitHub profile URL (Hero, Footer, project cards)
- `https://linkedin.com` — your LinkedIn URL (Hero, Footer)
- `/resume.pdf` — place your resume PDF in `/public/resume.pdf`

---

## Design System

| Token | Value |
|-------|-------|
| Accent | `#3b82f6` (blue) |
| Accent teal | `#06b6d4` |
| Accent purple | `#a855f7` |
| Dark bg | `#0a0a0f` |
| Light bg | `#f8f8f2` |
| Heading font | Inter |
| Code font | JetBrains Mono |

Dark mode is enabled by default, persisted in `localStorage` under the key `portfolio-theme`.

---

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the repo in the Vercel dashboard — it auto-detects Next.js and deploys on push.

No environment variables required for the base setup.
