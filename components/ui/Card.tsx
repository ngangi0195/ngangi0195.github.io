'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  glowColor?: 'blue' | 'teal' | 'purple' | 'none'
  hover?: boolean
  as?: 'div' | 'article' | 'li'
}

export function Card({
  children,
  className,
  glowColor = 'blue',
  hover = true,
  as = 'div',
}: CardProps) {
  const glowMap = {
    blue: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-blue-500/30',
    teal: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:border-cyan-500/30',
    purple: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:border-purple-500/30',
    none: '',
  }

  const Component = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <Component
      className={cn(
        'rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition-all duration-300',
        hover && [glowMap[glowColor], 'hover:-translate-y-0.5'],
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Component>
  )
}
