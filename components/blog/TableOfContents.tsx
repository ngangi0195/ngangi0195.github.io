'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('article h2, article h3'))
    setHeadings(
      els.map((el) => ({
        id: el.id,
        text: el.textContent ?? '',
        level: parseInt(el.tagName[1]),
      }))
    )
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="toc-root" aria-label="Table of contents">
      <p className="toc-label">On this page</p>
      <ul className="toc-list">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={`toc-item${active === id ? ' active' : ''}${level === 3 ? ' h3' : ''}`}>
            <a href={`#${id}`}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
