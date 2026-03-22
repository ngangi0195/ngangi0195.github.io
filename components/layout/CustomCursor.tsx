'use client'

import { useEffect } from 'react'

export function CustomCursor() {
  useEffect(() => {
    const el = document.getElementById('cursor')
    if (!el) return

    const onMove = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      const isLink    = !!t.closest('a, button, [role="button"], label')
      const isHover   = !!t.closest('article, .exp-row, .act-card, .proj-card, .roadmap-node, .hover-yellow')
      document.body.classList.toggle('cursor-link',  isLink)
      document.body.classList.toggle('cursor-hover', !isLink && isHover)
    }

    const onLeave = () => document.body.classList.remove('cursor-hover', 'cursor-link')

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover',  onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div id="cursor" aria-hidden="true" />
}
