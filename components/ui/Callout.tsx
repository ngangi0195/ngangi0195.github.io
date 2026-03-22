import { cn } from '@/lib/utils'
import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'tip' | 'danger'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
  className?: string
}

const calloutConfig: Record<
  CalloutType,
  { icon: React.ElementType; color: string; bg: string; border: string }
> = {
  info: {
    icon: Info,
    color: 'text-blue-400',
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/30',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/5',
    border: 'border-yellow-500/30',
  },
  tip: {
    icon: Lightbulb,
    color: 'text-teal-400',
    bg: 'bg-teal-500/5',
    border: 'border-teal-500/30',
  },
  danger: {
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/5',
    border: 'border-red-500/30',
  },
}

export function Callout({ type = 'info', title, children, className }: CalloutProps) {
  const { icon: Icon, color, bg, border } = calloutConfig[type]

  return (
    <div
      className={cn(
        'rounded-xl border p-4 my-6 flex gap-3',
        bg,
        border,
        className
      )}
    >
      <Icon className={cn('mt-0.5 shrink-0', color)} size={18} />
      <div>
        {title && (
          <p className={cn('font-semibold text-sm mb-1', color)}>{title}</p>
        )}
        <div className="text-sm text-[var(--text-secondary)] leading-6">{children}</div>
      </div>
    </div>
  )
}
