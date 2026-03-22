'use client'

import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'purple' | 'teal' | 'outline'
  size?: 'sm' | 'md'
  className?: string
  onClick?: () => void
  active?: boolean
}

export function Tag({
  children,
  variant = 'default',
  size = 'sm',
  className,
  onClick,
  active,
}: TagProps) {
  const base =
    'inline-flex items-center rounded-md font-mono-accent font-medium transition-all duration-200 select-none'

  const sizes = {
    sm: 'px-2 py-0.5 text-2xs',
    md: 'px-3 py-1 text-xs',
  }

  const variants = {
    default: cn(
      'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border)]',
      active && 'bg-blue-500/10 border-blue-500/40 text-blue-400',
      onClick && 'hover:bg-blue-500/10 hover:border-blue-500/40 hover:text-blue-400 cursor-pointer'
    ),
    accent:
      'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    purple:
      'bg-purple-500/10 text-purple-400 border border-purple-500/30',
    teal:
      'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
    outline:
      'border border-[var(--border)] text-[var(--text-muted)] bg-transparent',
  }

  return (
    <span
      className={cn(base, sizes[size], variants[variant], className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </span>
  )
}
