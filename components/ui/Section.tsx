import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  label?: string
  title?: string
  subtitle?: string
}

export function Section({ id, children, className, label, title, subtitle }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto', className)}
    >
      {(label || title || subtitle) && (
        <div className="mb-12">
          {label && (
            <p className="font-mono-accent text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-3">
              {label}
            </p>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-secondary max-w-2xl">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
