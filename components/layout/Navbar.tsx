'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const homeLinks: { href: string; label: string }[] = []

const globalLinks = [
  { href: '/blog',    label: 'Blog'    },
  { href: '/content', label: 'Personal' },
]

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="nav-root">
        <Link href="/" className="nav-logo">
          NG<span className="slash">/</span>dev
        </Link>

        <div className="nav-links">
          {isHome && homeLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          {globalLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link${pathname === l.href ? ' active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav-end">
          <div className="live-badge">
            <span className="live-dot" />
            OPEN TO WORK
          </div>
          <ThemeToggle />
          <a href="/resume.pdf" download className="nav-cta">Resume</a>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {isHome && homeLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        {globalLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={pathname === l.href ? 'active' : ''}
          >
            {l.label}
          </Link>
        ))}
        <a href="/resume.pdf" download className="cta-mob" onClick={() => setOpen(false)}>
          Download Resume
        </a>
      </div>
    </>
  )
}
